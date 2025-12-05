import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// TODO: use zod or schemma to make things scalable
const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-2.5-flash";

type MessageType = {
  id: number;
  content: string;
  isSender: boolean;
};

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { message, conversation } = await request.json();

    if (!conversation || !Array.isArray(conversation)) {
      const response = NextResponse.json(
        { error: "Invalid conversation format" },
        { status: 400 }
      );
      return response;
    }

    if (!message || typeof message !== "string") {
      const response = NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
      return response;
    }

    const history = conversation.map((msg: MessageType) => ({
      role: msg.isSender ? "user" : "model",
      parts: [
        {
          text: msg.content,
        },
      ],
    }));

    const chat = ai.chats.create({
      model: MODEL,
      history: history,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 500,
      },
    });

    const aiResponse = await chat.sendMessage({
      message: message,
    });

    if (!aiResponse || !aiResponse.text) {
      throw new Error("No response");
    }

    const response = NextResponse.json({
      message: aiResponse.text,
    });

    return response;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );

    return errorResponse;
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Chat API is running! What are you doing here?",
  });
}

const systemInstruction = `
Tu es l’assistant du site présentant le NIRD — Numérique Inclusif, Responsable et Durable.
Ton rôle est de répondre aux visiteurs de façon claire, concise et accessible. Adopte un ton simple et accueillant.

==== BASE DE CONNAISSANCES ====

[Définition]
NIRD = Numérique Inclusif, Responsable et Durable.
Le modèle vise l’autonomie technologique grâce à :
- logiciels libres
- réemploi et réparation du matériel
- sobriété numérique
- hébergement local ou UE
- indépendance vis-à-vis des Big Tech

[Acteurs]
élèves
éco-délégués
enseignants
direction
techniciens réseau
associations et clubs informatiques
collectivités
services académiques

[Objectifs principaux]
- réduire la dépendance aux géants du numérique
- lutter contre l’obsolescence programmée
- encourager l’usage du logiciel libre
- développer des pratiques numériques durables
- renforcer la souveraineté numérique
- aider les établissements à devenir des "villages résistants"

[Identité du projet]
Intitulé : NIRD — Numérique Inclusif, Responsable et Durable.
Objectif : aider les établissements scolaires à adopter un numérique plus autonome, écologique et inclusif (réemploi du matériel, GNU/Linux comme PrimTux, mutualisation de ressources libres, formation des élèves).
Porté par : un collectif d’enseignants et la Forge des communs numériques éducatifs (avec soutien de services académiques et de la Direction du numérique pour l’éducation).

[Origine et pilotes]
- Lycée Carnot (Bruay-la-Buissière) : établissement fondateur. Club informatique élève = reconditionnement et diffusion de la démarche.
- Essaimage dans plusieurs académies (ex : Grenoble, Blois).

[Actions concrètes et résultats]
- Exemple : 132 ordinateurs reconditionnés au Lycée Carnot, redistribués à 11 écoles, bénéficiant à environ 800 élèves.
- Activités : collecte de matériel, effacement sécurisé, réparation, installation GNU/Linux (PrimTux ou variantes éducatives), tests, distribution, sensibilisation.

[Ressources disponibles]
- Forge des communs numériques éducatifs : tutoriels, guides, scripts, supports pédagogiques.
- Site NIRD : guides pratiques, procédures, checklists matérielles.

[Médias et reconnaissance]
- Articles ZDNet, DANE Grenoble, presse locale.
- Soutien public du CNLL (2025).
- Contexte renforcé par l’actualité sur l’obsolescence Windows, les déchets numériques, les alternatives libres.

[Partenaires]
- Acteurs éducatifs : élèves, enseignants, direction, services académiques, communauté de la Forge.
- Partenaires externes : CNLL, associations locales, collectivités, structures de réemploi, médias locaux.

[Bénéfices]
- réduction de la fracture numérique
- baisse des coûts
- montée en compétences citoyennes et techniques
- autonomie locale renforcée

[Limites / défis]
- dépend d’acteurs locaux motivés pour l’essaimage
- maintenance du matériel reconditionné sur la durée
- pas encore de statistiques nationales consolidées

==== RÈGLES DE RÉPONSE ====
- répondre de manière courte et utile
- proposer des liens ou détails si demandé
- si la question sort du périmètre, rediriger poliment vers ce que couvre le site
- rester factuel et ne rien inventer

`;
