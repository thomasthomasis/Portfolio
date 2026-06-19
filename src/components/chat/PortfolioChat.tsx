"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";


export default function PortfolioChat() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me anything about Thomas's portfolio."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if(open) {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
  }, [open]);



  async function sendMessage() {

    if (!input.trim()) return;


    const userMessage = {
      role:"user",
      text:input
    };


    setMessages(prev => [
      ...prev,
      userMessage
    ]);


    const question = input;

    setInput("");
    setLoading(true);



    const response = await fetch(
      "/api/chat",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:question
        })
      }
    );


    const data = await response.json();


    setMessages(prev => [
      ...prev,
      {
        role:"assistant",
        text:
        data.answer ??
        "Sorry, I couldn't answer that."
      }
    ]);


    setLoading(false);
  }



  return (

    <div className="fixed bottom-6 right-6 z-50">


      {/* CHAT WINDOW */}

      {
        open && (

          <div
          className="
          mb-4
          w-[350px]
          h-[450px]
          rounded-2xl
          border
          border-white/20
          bg-black/80
          backdrop-blur-xl
          shadow-2xl
          flex
          flex-col
          overflow-hidden
          "
          >


            {/* HEADER */}

            <div
            className="
            flex
            justify-between
            items-center
            p-4
            border-b
            border-white/10
            "
            >

              <span>
                Thomas AI
              </span>


              <button
              onClick={() => setOpen(false)}
              >

                <X size={18}/>

              </button>


            </div>



            {/* MESSAGES */}

            <div
            className="
            flex-1
            overflow-y-auto
            p-4
            space-y-3
            "
            >

              {
              messages.map(
                (msg,index)=>(

                <div
                key={index}
                className={`
                rounded-xl
                p-3
                text-sm

                ${
                  msg.role==="user"
                  ?
                  "bg-blue-500/30 ml-8"
                  :
                  "bg-white/10 mr-8"
                }

                `}
                >

                  {msg.text}

                </div>

                )
              )
              }

              <div ref={messagesEndRef} />


            </div>



            {/* INPUT */}

            <div
            className="
            p-3
            border-t
            border-white/10
            flex
            gap-2
            "
            >

              <input

              value={input}

              onChange={
                e=>setInput(e.target.value)
              }

              onKeyDown={
                e=>{
                  if(e.key==="Enter")
                    sendMessage()
                }
              }

              placeholder="Ask me something..."

              className="
              flex-1
              bg-white/10
              rounded-lg
              px-3
              py-2
              outline-none
              "

              />


              <button
              onClick={sendMessage}
              disabled={loading}
              className="
              px-3
              rounded-lg
              bg-white
              text-black
              "
              >

                →

              </button>


            </div>


          </div>

        )
      }



      {/* FLOATING BUTTON */}

      <button

      onClick={() => setOpen(!open)}

      className="
      w-16
      h-16
      rounded-full
      bg-white
      text-black
      flex
      items-center
      justify-center
      shadow-xl
      hover:scale-110
      transition
      "

      >

        {
          open
          ?
          <X />
          :
          <MessageCircle />
        }


      </button>


    </div>

  );

}