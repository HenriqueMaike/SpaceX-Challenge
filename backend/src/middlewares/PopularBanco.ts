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
    patchLinks: PatchLinks[];
    redditLinks: RedditLinks[];
    flickrLinks: FlickrLinks[];
    presskit?: string;
    webcast?: string;
    youtubeId?: string;
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
    landingAttempt: boolean;
    landingSuccess?: boolean;
    landingType?: string;
    landpad?: string;
    launch_id: number;
}

export interface Launch {
    id: number;
    fairings: Fairing[];
    links: Links[];
    staticFireDateUtc?: Date | string;
    staticFireDateUnix?: number;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: Failure[];
    details?: string;
    crew: string[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flightNumber: number;
    name: string;
    dateUtc: string;
    dateUnix: number;
    dateLocal: string;
    datePrecision: string;
    upcoming: boolean;
    cores: Cores[];
    autoUpdate: boolean;
    tbd: boolean;
    launchLibraryId?: string;
}

export interface DadosRequest {
    dados: {
        fairings: Fairing[];
        patchLinks: PatchLinks[];
        redditLinks: RedditLinks[];
        flickrLinks: FlickrLinks[];
        links: Links[];
        failures: Failure[];
        cores: Cores[];
        Launch: Launch;
    };
}

async function PopularBanco(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await axios.get('https://api.spacexdata.com/v5/launches');
        const responseData = response.data as Launch;

        //console.log(responseData[0]); 
        
        const launch = {
            id: responseData[0]?.id,
            staticFireDateUtc: responseData[0]?.static_fire_date_utc,
            staticFireDateUnix: responseData[0]?.static_fire_date_unix,
            net: responseData[0]?.net,
            window: responseData[0]?.window,
            rocket: responseData[0]?.rocket,
            success: responseData[0]?.success,
            details: responseData[0]?.details,
            crew: responseData[0]?.crew,
            ships: responseData[0]?.ships,
            capsules: responseData[0]?.capsules,
            payloads: responseData[0]?.payloads,
            launchpad: responseData[0]?.launchpad,
            flightNumber: responseData[0]?.flight_number,
            name: responseData[0]?.name,
            dateUtc: responseData[0]?.date_utc,
            dateUnix: responseData[0]?.date_unix,
            dateLocal: responseData[0]?.date_local,
            datePrecision: responseData[0]?.date_precision,
            upcoming: responseData[0]?.upcoming,
            autoUpdate: responseData[0]?.auto_update,
            tbd: responseData[0]?.static_fire_date_utc,
            launchLibraryId: responseData[0]?.launch_library_id,
        }

        console.log(launch);

        
        return res.status(200).json({ message: "Database populated successfully" });
    } catch (err) {
        return res.status(401).end();
    }
}

export { PopularBanco };
