import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from "../auth/route";

export async function POST() {
  try {
    // Create admin user
    const existingAdmin = await db.user.findUnique({ where: { email: "admin@adp.com.br" } });
    if (!existingAdmin) {
      await db.user.create({
        data: {
          email: "admin@adp.com.br",
          password: hashPassword("adp2026"),
          name: "Admin ADP",
          role: "admin",
        },
      });
    }

    // Seed football players (professional - male only)
    const footballPlayers = [
      { id: "fb-1", name: "Lucas Mendes", position: "Goleiro", number: 1, sport: "football", team: "professional", goals: 0, assists: 0, matches: 28 },
      { id: "fb-2", name: "Rafael Torres", position: "Lateral Direito", number: 2, sport: "football", team: "professional", goals: 2, assists: 7, matches: 30 },
      { id: "fb-4", name: "Matheus Silva", position: "Zagueiro", number: 4, sport: "football", team: "professional", goals: 3, assists: 1, matches: 32 },
      { id: "fb-5", name: "Carlos Eduardo", position: "Zagueiro", number: 5, sport: "football", team: "professional", goals: 1, assists: 0, matches: 29 },
      { id: "fb-6", name: "Fernando Lima", position: "Lateral Esquerdo", number: 6, sport: "football", team: "professional", goals: 1, assists: 9, matches: 31 },
      { id: "fb-8", name: "André Santos", position: "Volante", number: 8, sport: "football", team: "professional", goals: 4, assists: 6, matches: 33 },
      { id: "fb-10", name: "Diego Alves", position: "Volante", number: 10, sport: "football", team: "professional", goals: 8, assists: 12, matches: 34 },
      { id: "fb-7", name: "Thiago Neves", position: "Meia", number: 7, sport: "football", team: "professional", goals: 11, assists: 8, matches: 30 },
      { id: "fb-14", name: "Pedro Henrique", position: "Meia-Atacante", number: 14, sport: "football", team: "professional", goals: 15, assists: 10, matches: 32 },
      { id: "fb-11", name: "Gustavo Barros", position: "Extremo", number: 11, sport: "football", team: "professional", goals: 12, assists: 14, matches: 31 },
      { id: "fb-9", name: "Victor Ramos", position: "Centroavante", number: 9, sport: "football", team: "professional", goals: 22, assists: 5, matches: 33 },
      { id: "fb-17", name: "Bruno Costa", position: "Centroavante", number: 17, sport: "football", team: "professional", goals: 9, assists: 3, matches: 26 },
    ];

    for (const p of footballPlayers) {
      await db.player.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    // Seed volleyball players (professional - female only)
    const volleyballPlayers = [
      { id: "vb-1", name: "Ana Oliveira", position: "Levantador", number: 1, sport: "volleyball", team: "professional", goals: 0, assists: 245, matches: 28 },
      { id: "vb-7", name: "Beatriz Souza", position: "Ponteiro", number: 7, sport: "volleyball", team: "professional", goals: 198, assists: 12, matches: 30 },
      { id: "vb-10", name: "Camila Santos", position: "Oposto", number: 10, sport: "volleyball", team: "professional", goals: 215, assists: 8, matches: 29 },
      { id: "vb-4", name: "Diana Vitor", position: "Central", number: 4, sport: "volleyball", team: "professional", goals: 156, assists: 3, matches: 27 },
      { id: "vb-5", name: "Elisa Costa", position: "Central", number: 5, sport: "volleyball", team: "professional", goals: 142, assists: 2, matches: 28 },
      { id: "vb-6", name: "Fernanda Ferreira", position: "Líbero", number: 6, sport: "volleyball", team: "professional", goals: 0, assists: 0, matches: 30 },
    ];

    for (const p of volleyballPlayers) {
      await db.player.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    // Seed basketball male team
    const basketballMalePlayers = [
      { id: "bb-1", name: "Anderson Silva", position: "Armador", number: 1, sport: "basketball", team: "basketball_male", goals: 0, assists: 156, matches: 24 },
      { id: "bb-5", name: "Rodrigo Lima", position: "Ala-armador", number: 5, sport: "basketball", team: "basketball_male", goals: 312, assists: 89, matches: 26 },
      { id: "bb-7", name: "Caio Mendes", position: "Ala", number: 7, sport: "basketball", team: "basketball_male", goals: 287, assists: 45, matches: 25 },
      { id: "bb-11", name: "Thiago Duarte", position: "Ala", number: 11, sport: "basketball", team: "basketball_male", goals: 298, assists: 52, matches: 27 },
      { id: "bb-14", name: "Eduardo Pinto", position: "Pivô", number: 14, sport: "basketball", team: "basketball_male", goals: 356, assists: 28, matches: 25 },
      { id: "bb-21", name: "Gustavo Neves", position: "Pivô", number: 21, sport: "basketball", team: "basketball_male", goals: 320, assists: 22, matches: 23 },
    ];

    for (const p of basketballMalePlayers) {
      await db.player.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    // Seed basketball mixed team
    const basketballMixedPlayers = [
      { id: "bbm-3", name: "Patrícia Lima", position: "Ala", number: 3, sport: "basketball", team: "basketball_mixed", goals: 180, assists: 55, matches: 20 },
      { id: "bbm-8", name: "Carlos Mendes", position: "Armador", number: 8, sport: "basketball", team: "basketball_mixed", goals: 200, assists: 95, matches: 22 },
      { id: "bbm-12", name: "Juliana Rocha", position: "Pivô", number: 12, sport: "basketball", team: "basketball_mixed", goals: 250, assists: 20, matches: 21 },
      { id: "bbm-15", name: "Ricardo Alves", position: "Ala-armador", number: 15, sport: "basketball", team: "basketball_mixed", goals: 175, assists: 68, matches: 23 },
      { id: "bbm-20", name: "Amanda Silva", position: "Ala", number: 20, sport: "basketball", team: "basketball_mixed", goals: 165, assists: 40, matches: 19 },
      { id: "bbm-25", name: "Thiago Santos", position: "Pivô", number: 25, sport: "basketball", team: "basketball_mixed", goals: 210, assists: 25, matches: 18 },
    ];

    for (const p of basketballMixedPlayers) {
      await db.player.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    // Seed youth players
    const youthPlayers = [
      // Football youth
      { id: "yf-1", name: "João Silva (Sub-17)", position: "Atacante", number: 9, sport: "football", team: "youth", goals: 8, assists: 3, matches: 12 },
      { id: "yf-2", name: "Gabriel Santos (Sub-17)", position: "Meia", number: 10, sport: "football", team: "youth", goals: 5, assists: 7, matches: 14 },
      { id: "yf-3", name: "Matheus Oliveira (Sub-17)", position: "Zagueiro", number: 4, sport: "football", team: "youth", goals: 1, assists: 0, matches: 10 },
      { id: "yf-4", name: "Lucas Ferreira (Sub-17)", position: "Goleiro", number: 1, sport: "football", team: "youth", goals: 0, assists: 0, matches: 11 },
      // Volleyball youth
      { id: "yv-1", name: "Isabela Martins (Sub-17)", position: "Ponteiro", number: 7, sport: "volleyball", team: "youth", goals: 45, assists: 5, matches: 10 },
      { id: "yv-2", name: "Mariana Costa (Sub-17)", position: "Levantador", number: 1, sport: "volleyball", team: "youth", goals: 0, assists: 78, matches: 12 },
      { id: "yv-3", name: "Larissa Souza (Sub-17)", position: "Central", number: 5, sport: "volleyball", team: "youth", goals: 38, assists: 2, matches: 9 },
      // Basketball youth
      { id: "yb-1", name: "Pedro Almeida (Sub-17)", position: "Armador", number: 3, sport: "basketball", team: "youth", goals: 42, assists: 30, matches: 10 },
      { id: "yb-2", name: "Ana Clara (Sub-17)", position: "Ala", number: 8, sport: "basketball", team: "youth", goals: 55, assists: 12, matches: 11 },
      { id: "yb-3", name: "Rafael Nunes (Sub-17)", position: "Pivô", number: 12, sport: "basketball", team: "youth", goals: 68, assists: 8, matches: 9 },
    ];

    for (const p of youthPlayers) {
      await db.player.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    // Seed matches
    const matches = [
      // Football matches (professional)
      { id: "match-football-2026-04-12", homeTeam: "ADP", opponent: "Londrina EC", sport: "football", team: "professional", competition: "Campeonato Paranaense", date: new Date("2026-04-12"), time: "16:00", status: "upcoming", venue: "Casa" },
      { id: "match-football-2026-04-19", homeTeam: "Atlas FC", opponent: "ADP", sport: "football", team: "professional", competition: "Clássico das Raízes", date: new Date("2026-04-19"), time: "19:00", status: "upcoming", venue: "Fora" },
      { id: "match-football-2026-04-26", homeTeam: "ADP", opponent: "Maringá FC", sport: "football", team: "professional", competition: "Campeonato Paranaense", date: new Date("2026-04-26"), time: "15:00", status: "upcoming", venue: "Casa" },
      // Volleyball matches (professional)
      { id: "match-volleyball-2026-04-14", homeTeam: "ADP", opponent: "Curitiba VC", sport: "volleyball", team: "professional", competition: "Superliga Paranaense", date: new Date("2026-04-14"), time: "20:00", status: "upcoming", venue: "Casa" },
      { id: "match-volleyball-2026-04-21", homeTeam: "Londrina Vôlei", opponent: "ADP", sport: "volleyball", team: "professional", competition: "Superliga Paranaense", date: new Date("2026-04-21"), time: "18:00", status: "upcoming", venue: "Fora" },
      // Basketball male matches
      { id: "match-basketball-2026-04-15", homeTeam: "ADP", opponent: "Maringá Basquete", sport: "basketball", team: "basketball_male", competition: "Liga Paraná de Basquete", date: new Date("2026-04-15"), time: "19:30", status: "upcoming", venue: "Casa" },
      { id: "match-basketball-2026-04-22", homeTeam: "Ponta Grossa BC", opponent: "ADP", sport: "basketball", team: "basketball_male", competition: "Liga Paraná de Basquete", date: new Date("2026-04-22"), time: "20:00", status: "upcoming", venue: "Fora" },
      // Basketball mixed matches
      { id: "match-basketball-mixed-2026-04-16", homeTeam: "ADP", opponent: "Cascavel Basquete", sport: "basketball", team: "basketball_mixed", competition: "Liga Paraná de Basquete Misto", date: new Date("2026-04-16"), time: "18:00", status: "upcoming", venue: "Casa" },
      { id: "match-basketball-mixed-2026-04-23", homeTeam: "Guarapuava BC", opponent: "ADP", sport: "basketball", team: "basketball_mixed", competition: "Liga Paraná de Basquete Misto", date: new Date("2026-04-23"), time: "19:00", status: "upcoming", venue: "Fora" },
    ];

    for (const m of matches) {
      await db.match.upsert({
        where: { id: m.id },
        update: m,
        create: m,
      });
    }

    // Seed news
    const news = [
      {
        id: "news-1",
        title: "ADP Conquista Importante Vitória no Campeonato Regional",
        description: "Com um gol espetacular de Pedro Henrique nos minutos finais, a Associação Desportiva do Piquiri venceu por 2 a 1 e se consolidou na liderança do campeonato paranaense. A torcida lotou a Arena Piquiri e celebrou mais uma conquista histórica do clube.",
        category: "Futebol", sport: "football", featured: true,
      },
      {
        id: "news-2",
        title: "Novo Centro de Treinamento Será Inaugurado em Maio",
        description: "A ADP anuncia a inauguração de seu novo centro de treinamento, com infraestrutura de primeiro nível para o desenvolvimento dos atletas profissionais e das categorias de base.",
        category: "Infraestrutura", sport: "general", featured: false,
      },
      {
        id: "news-3",
        title: "Time de Vôlei Avança às Semifinais da Superliga",
        description: "O time de voleibol da ADP venceu a série por 2-0 e avançou às semifinais da Superliga Paranaense. Destaque para Beatriz Souza que foi a melhor pontuadora da partida com 22 pontos.",
        category: "Vôlei", sport: "volleyball", featured: true,
      },
      {
        id: "news-4",
        title: "Basquete ADP Vence Clássico Regional",
        description: "O time de basquete da ADP derrotou o rival por 88-72 em jogo eletrizante na Arena Piquiri. Anderson Silva liderou a equipe com 24 pontos e 11 assistências.",
        category: "Basquete", sport: "basketball", featured: false,
      },
      {
        id: "news-5",
        title: "Clássico das Raízes: Tudo Sobre o Confronto ADP vs Atlas",
        description: "Confira as informações completas sobre o próximo confronto entre ADP e Atlas FC, incluindo data, horário, ingressos e as expectativas para mais uma edição do grande clássico do futebol paranaense.",
        category: "Clássico", sport: "football", featured: false,
      },
      {
        id: "news-6",
        title: "Programa Social do Clube Beneficia Mais de 500 Crianças",
        description: "O projeto social Águas do Futuro da ADP atinge a marca de 500 crianças atendidas, oferecendo atividades esportivas, educacionais e apoio alimentar para a comunidade paranaense.",
        category: "Social", sport: "general", featured: false,
      },
    ];

    for (const n of news) {
      await db.news.upsert({
        where: { id: n.id },
        update: n,
        create: n,
      });
    }

    return NextResponse.json({
      message: "Database seeded successfully!",
      admin: { email: "admin@adp.com.br", password: "adp2026" },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Erro ao popular banco de dados" }, { status: 500 });
  }
}
