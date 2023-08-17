import prismaClient from "../prisma";

const axios = require('axios');
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
  

const PopularBanco = async () => {
    const response = await axios.get('https://api.spacexdata.com/v5/launches');
    const responseLaunch = response.data as Launch[];

    async function PopularLaunch(){
        try {
    
            if (responseLaunch.length > 0) {
                for (const launchData of responseLaunch) {
                                        
                    const existingLaunch = await prismaClient.launch.findUnique({
                        where: { id: launchData.id }
                    });
                    if (!existingLaunch) {
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
                        await prismaClient.patchLinks.create({
                            data: {
                                small: launchData?.links.patch.small,
                                large: launchData?.links.patch.large,
                                links_id: link?.id
                            }
                        }); 
                        await prismaClient.redditLinks.create({
                            data: {
                                campaign: launchData?.links.reddit.campaign,
                                launch: launchData?.links.reddit.launch,
                                media: launchData?.links.reddit.media,
                                recovery: launchData?.links.reddit.recovery,
                                links_id: link?.id
                            }
                        });
                        await prismaClient.flickrLinks.create({
                            data: {
                                small: launchData?.links.flickr.small,
                                original: launchData?.links.flickr.original,
                                links_id: link?.id
                            }
                        });


                        if (launchData?.fairings) {
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

                        if (launchData?.failures) {
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

                        if (launchData?.cores) {
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

                        if (launchData?.crew) {
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
                console.log('Nenhum dado de lançamento encontrado.');
            }
    
        } catch (err) {
            console.log('Erro ao cadastrar');
            return;
        }
    }
    
    PopularLaunch();
};

export { PopularBanco };