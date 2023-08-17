import prismaClient from "../prisma";

class ListarLaunchesStatsService {
  async execute() {

    //variavel que recebe os dados da busca no banco de daods, sendo os stats, que contem name, cores.reused, success
    const launches = await prismaClient.launch.findMany({
        select: {
            success: true,
            name: true,
            cores: {
                select: {
                    reused: true
                }
            }
        }
    });

    return launches;
  }
}

export { ListarLaunchesStatsService };