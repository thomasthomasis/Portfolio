import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { portfolioInfo } from "@/data/portfolio";
import { ratelimit } from "@/lib/rateLimit";


export async function POST(req: Request) {

  try {

    const ip =
      req.headers.get("x-forwarded-for") ?? "unknown";


    const {success} =
      await ratelimit.limit(ip);


    if(!success){
      return NextResponse.json(
        {
          error:
          "Too many requests. Try again later."
        },
        {
          status:429
        }
      );
    }


    const body = await req.json();

    const message = body.message;


    if(
      !message ||
      message.length > 500
    ){
      return NextResponse.json(
        {
          error:
          "Invalid message"
        },
        {
          status:400
        }
      );
    }



    const response =
      await openai.chat.completions.create({

        model:
        "gpt-4o-mini",

        max_tokens:200,


        messages:[

          {
            role:"system",
            content:portfolioInfo
          },

          {
            role:"user",
            content:message
          }

        ]

      });


    return NextResponse.json({

      answer:
      response.choices[0]
      .message.content

    });


  }
  catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:
        "Something went wrong"
      },
      {
        status:500
      }
    );

  }

}