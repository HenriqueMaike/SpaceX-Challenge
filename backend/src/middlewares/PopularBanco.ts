import prismaClient from "../prisma";

//Biblioteca Axios responsavel pela requisicao da API
const axios = require('axios');

//Tipagem do objeto Launch recebido pela API com todos os seus Arrays e types especificos
interface Launch {
    id: string;
    fairings: {
        id: number;
        reused?: boolean;
        recovery_attempt?: boolean;
        recovered?: boolean;
        ships: string[];
        launch_id: string;
    };
    links: {
        id: number;
        patch:{
            small: string;
            large: string;
            links_id: number;
        },
        reddit: {
            id: number;
            campaign?: string;
            launch?: string;
            media?: string;
            recovery?: string;
            links_id: number;
        },
        flickr: {
            id: number;
            small: string[];
            original: string[];
            links_id: number;
        },
        presskit?: string;
        webcast?: string;
        youtube_id?: string;
        article?: string;
        wikipedia?: string;
        launch_id: string;
    };
    static_fire_date_utc?: string;
    static_fire_date_unix?: number;
    net?: boolean;
    window?: number;
    rocket?: string;
    success?: boolean;
    failures:[ 
        {
            id: number;
            time?: number | string;
            altitude?: number | string;
            reason?: string;
            launch_id: string;
        }
    ];
    details?: string;
    crew: [
        {
            id: number;
            crew?: string;
            role?: string;
            launch_id: string;
        }
    ];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad?: string;
    flight_number?: number;
    name?: string;
    date_utc?: string;
    date_unix?: number;
    date_local?: string;
    date_precision?: string;
    upcoming?: boolean;
    cores: [
        {
            id: number;
            core?: string;
            flight?: number;
            gridfins?: boolean;
            legs?: boolean;
            reused?: boolean;
            landing_attempt?: boolean;
            landing_success?: boolean;
            landing_type?: string;
            landpad?: string;
            launch_id: string;
        }
    ];
    auto_update?: boolean;
    tbd?: boolean;
    launch_library_id?: string;
}
  
//Função responsavel por popular o banco de dados com os dados obtidos pela API
const PopularBanco = async () => {
    // response é a variavel responsavel por receber a requisicao a API spaceS atraves do axios
    const response = await axios.get('https://api.spacexdata.com/v5/launches');

    ///responseLaunch recebe os dados do response e tipa como Launch
    const responseLaunch = response.data as Launch[];

    //função responsavel por povoar o banco de dados com as informações de responseLaunch
    async function PopularLaunch(){
        try { 
            //Verifica se responseLaunch possui dados se sim avança
            if (responseLaunch.length > 0) {
                //laço de repetição e execulta a quantidade de vezes o tamanho do array responseLaunch
                for (const launchData of responseLaunch) {
                    
                    //verifica se dentro da tabela launch ja existe um id igual o obtido da API se sim armazena na existingLaunch
                    const existingLaunch = await prismaClient.launch.findUnique({
                        where: { id: launchData.id }
                    });
                    //se existingLaunch estiver vazia adiciona os dados no banco, se ja existir o id verifica o proximo até verificar todos os objeto do array
                    if (!existingLaunch) {

                        //povoa a tabela launch
                        await prismaClient.launch.create({
                            data:{
                                id: launchData.id,
                                static_fire_date_utc: launchData.static_fire_date_utc,
                                static_fire_date_unix: launchData.static_fire_date_unix,
                                net: launchData.net,
                                window: launchData.window,
                                rocket: launchData.rocket,
                                success: launchData.success,
                                details: launchData.details,
                                ships: launchData.ships,
                                capsules: launchData.capsules,
                                payloads: launchData.payloads,
                                launchpad: launchData.launchpad,
                                flight_number: launchData.flight_number,
                                name: launchData.name,
                                date_utc: launchData.date_utc,
                                date_unix: launchData.date_unix,
                                date_local: launchData.date_local,
                                date_precision: launchData.date_precision,
                                upcoming: launchData.upcoming,
                                auto_update: launchData.auto_update,
                                tbd: launchData.tbd,
                                launch_library_id: launchData.launch_library_id,
                            }
                        })

                        //povoa a tabela link e arvazena os dados temporariamente na variavel link para poder ser usada para ensirir os dados 
                        //nas tabelas que possuem dependencia do ID de links
                        const link = await prismaClient.links.create({
                            data: {
                                presskit: launchData.links.presskit,
                                webcast: launchData.links.webcast,
                                youtube_id: launchData.links.youtube_id,
                                article: launchData.links.article,
                                wikipedia: launchData.links.wikipedia,
                                launch_id: launchData.id
                            }
                        }); 

                        //Povoa a tabela patchLinks e vincula o ID de links obtido da variavel link
                        await prismaClient.patchLinks.create({
                            data: {
                                small: launchData?.links.patch.small,
                                large: launchData?.links.patch.large,
                                links_id: link?.id
                            }
                        }); 

                        //Povoa a tabela redditLinks e vincula o ID de links obtido da variavel link
                        await prismaClient.redditLinks.create({
                            data: {
                                campaign: launchData?.links.reddit.campaign,
                                launch: launchData?.links.reddit.launch,
                                media: launchData?.links.reddit.media,
                                recovery: launchData?.links.reddit.recovery,
                                links_id: link?.id
                            }
                        });

                        //Povoa a tabela flickrLinks e vincula o ID de links obtido da variavel link
                        await prismaClient.flickrLinks.create({
                            data: {
                                small: launchData?.links.flickr.small,
                                original: launchData?.links.flickr.original,
                                links_id: link?.id
                            }
                        });

                        //Verifica se fairings existe, se sim adiciona os dados na tabela, se não so prossegue
                        if (launchData?.fairings) {
                            //Povoa a tabela fairing
                            await prismaClient.fairing.create({
                                data: {
                                    reused: launchData.fairings.reused ?? null,
                                    recovery_attempt: launchData.fairings.recovery_attempt ?? null,
                                    recovered: launchData.fairings.recovered ?? null,
                                    ships: launchData.fairings.ships ?? null,
                                    launch_id: launchData.id
                                }
                            });
                        }
                        
                        //Verifica se failures existe, se sim adiciona os dados na tabela, se não so prossegue
                        if (launchData?.failures) {
                            //Povoa a tabela failures, como recebe um array utiliza um laço de repetiçao para verificar se existe mais dados para inserir
                            for (const failure of launchData.failures) {
                                await prismaClient.failure.create({
                                    data: {
                                        time: failure.time ?? null,
                                        altitude: failure.altitude ?? null,
                                        reason: failure.reason ?? null,
                                        launch_id: launchData.id,
                                    }
                                });
                            }
                        }
                        
                        //Verifica se cores existe, se sim adiciona os dados na tabela, se não so prossegue
                        if (launchData?.cores) {
                            //Povoa a tabela cores, como recebe um array utiliza um laço de repetiçao para verificar se existe mais dados para inserir
                            for (const cores of launchData.cores) {
                                await prismaClient.cores.create({
                                    data: {
                                        core: cores.core ?? null,
                                        flight: cores.flight ?? null,
                                        gridfins: cores.gridfins ?? null,
                                        legs: cores.legs ?? null,
                                        reused: cores.reused ?? null,
                                        landing_attempt: cores.landing_attempt ?? null,
                                        landing_success: cores.landing_success ?? null,
                                        landing_type: cores.landing_type ?? null,
                                        landpad: cores.landpad ?? null,
                                        launch_id: launchData.id,
                                    }
                                });
                            }
                        }

                        //Verifica se crew existe, se sim adiciona os dados na tabela, se não so prossegue
                        if (launchData?.crew) {
                            //Povoa a tabela crew, como recebe um array utiliza um laço de repetiçao para verificar se existe mais dados para inserir
                            for (const crew of launchData.crew) {
                                await prismaClient.crew.create({
                                    data: {
                                        crew: crew.crew ?? null,
                                        role: crew.role ?? null,
                                        launch_id: launchData.id,
                                    }
                                });
                            }
                        }
                    }
                }

            } else {
                //devolve no console se nenhum dados for encontado caso responseLaunch.length for === 0
                console.log('Nenhum dado de lançamento encontrado.');
            }
    
        } catch (err) {
            //se encontrar alguns erro durando o povoamento das tabelas devolve um console Erro ao cadastrar e encerra
            console.log('Erro ao cadastrar');
            return;
        }
    }
    
    //Chama a função PopularLaunch
    PopularLaunch();
};

export { PopularBanco };