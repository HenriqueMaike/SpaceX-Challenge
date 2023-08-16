import { Response, Request, NextFunction } from "express";
import prismaClient from "../prisma";

const axios = require('axios');

interface Fairing {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
    launch_id: number;
}

interface PatchLinks {
    small: string;
    large: string;
    links_id: number;
}

interface RedditLinks {
    campaign?: string;
    launch?: string;
    media?: string;
    recovery?: string;
    links_id: number;
}

interface FlickrLinks {
    small: string[];
    original: string[];
    links_id: number;
}

interface Links {
    patch_links: PatchLinks[];
    reddit_links: RedditLinks[];
    flickr_links: FlickrLinks[];
    presskit?: string;
    webcast?: string;
    youtube_id?: string;
    article?: string;
    wikipedia?: string;
    launch_id: number;
}

export interface Failure {
    time: number;
    altitude: number;
    reason: string;
    launch_id: number;
}

export interface Cores {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success?: boolean;
    landing_type?: string;
    landpad?: string;
    launch_id: number;
}

export interface Crew {
    id: number;
    crew?: string;
    role?: string;
}

export interface Launch {
    id: number;
    fairings: Fairing[];
    links: Links[];
    static_fire_date_utc?: Date | string;
    static_fire_date_unix?: number;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: Failure[];
    details?: string;
    crew: Crew[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Cores[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id?: string;
}

// export interface DadosRequest {
//     dados: {
//         fairings: Fairing[];
//         patchLinks: PatchLinks[];
//         redditLinks: RedditLinks[];
//         flickrLinks: FlickrLinks[];
//         links: Links[];
//         failures: Failure[];
//         cores: Cores[];
//         Launch: Launch;
//     };
// }

const PopularBanco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axios.get('https://api.spacexdata.com/v5/launches');
        const responseData = response.data as Launch[];
  
        if (responseData.length > 0) {
            for (const launchData of responseData) {
                
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
                }
            }         
            return res.status(200).json({ message: 'Database populated successfully' });

        } else {
            console.log('Nenhum dado de lançamento encontrado.');
        }

    } catch (err) {
        console.log('Erro ao cadastrar');
        return res.status(401).end();
    }
};

export { PopularBanco };