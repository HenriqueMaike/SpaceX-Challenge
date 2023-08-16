import { Response, Request } from "express";
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
    staticFireDateUtc?: Date;
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
    dateUtc: Date;
    dateUnix: number;
    dateLocal: Date;
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

async function PopularBanco(req: Request, res: Response, dados: DadosRequest) {
    try {
        const response = await axios.get('https://api.spacexdata.com/v5/launches');
        const dados = response.data as DadosRequest;

            const fairingData = dados.dados.fairings;
            const patchLinksData = dados.dados.links;
            const redditLinksData = dados.dados.links; 
            const flickrLinksData = dados.dados.links; 
            const linksData = dados.dados.links;
            const failuresData = dados.dados.failures;
            const coresData = dados.dados.cores;
            const launchData = dados.dados;

            await prismaClient.launch.create({
                data: launchData,
            });

            
            
        }catch(err) {

        }

}

export { PopularBanco };


/*
            await prismaClient.links.create({
                data: linksData,
            });

            await prismaClient.cores.create({
                data: coresData,
            });

            await prismaClient.fairing.create({
                data: fairingData,
            });

             await prismaClient.patchLinks.create({
                data: patchLinksData,
            });

            await prismaClient.redditLinks.create({
                data: redditLinksData,
            });

            await prismaClient.flickrLinks.create({
                data: flickrLinksData,
            });

            await prismaClient.failure.create({
                data: failuresData,
            });
            */