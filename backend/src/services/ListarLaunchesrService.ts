import prismaClient from "../prisma";

class ListarLaunchesrService {
  async execute(page = 1, itemsPerPage = 5, search = "", limit = 0) {
    const skips = (page - 1) * itemsPerPage;

    // variavel que contaem os parametros de busca e paginação
    const where = search ? { name: { contains: search, mode: "insensitive" } } : {};

    // Requisição de informações do banco de daods, e seus relacionamentos, com as propriedades de paginaçãoÇ skip, itemsPerPage, e os parametros de where
    const launches = await prismaClient.launch.findMany({
      skip: skips,
      take: itemsPerPage,
      where: where,
      include: {
        fairings: true,
        links: {
          include: {
            patch_links: true,
            reddit_links: true,
            flickr_links: true,
          },
        },
        failures: true,
        crew: true,
        cores: true,
      },
    });

    //variavel que retorna as informações da paginação
    const totalDocs = await prismaClient.launch.count({ where });

    //retorna os dados de launch e os dados de paginação para meu controller
    return { results: launches, totalDocs };
  }
}

export { ListarLaunchesrService };
