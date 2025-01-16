import React, { useState } from 'react';
import { Client } from '@gradio/client';

const AIcomponent = () =>{
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission and interaction with Gradio
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const client = await Client.connect("yuntian-deng/ChatGPT");
            // Make sure to use the correct Gradio app name and endpoint
            const result = await client.predict("/predict", {
            inputs: input,
            top_p: 0, // You can adjust these parameters as needed
            temperature: 0,
            chat_counter: 3, // Example: Change this value based on your use case
            chatbot: [['Hello!', null]], // Initial chatbot context; modify if needed
            });

            // Check if result.data is an object, and convert it to a string if necessary
            if (typeof result.data === 'object') {
            const object = result.data;  // Assuming result.data is an object
            setResponse(object[0][0][1]); // stringify for object responses
            } else {
            setResponse(result.data); // use as is if it's a string

            }
        } catch (error) {
            setResponse('Sorry, something went wrong!');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <main className="main-screen">
        <div className="bg-white rounded-lg shadow p-6">
          
          <div className="p-4 flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
              
              <div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ask your programming question..."
                  rows="4"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? 'Thinking...' : 'Ask Question'}
              </button>

            </form>
        
            {response && (
              <div className="mt-4 p-6 border rounded bg-white shadow-lg max-w-3xl w-full">
                <h2 className="font-bold mb-2 text-xl">Response:</h2>
                <pre className="whitespace-pre-wrap break-words">
                  {response.split('\n').map((line, index) => {
                    // Wrap bold text markers (**text**) with <strong> tags
                    return (
                      <p key={index}>
                        {line.split('**').map((segment, idx) => {
                          if (idx % 2 !== 0) {
                            // Bold segments
                            return <strong key={idx}>{segment}</strong>;
                          }
                          return segment;
                        })}
                      </p>
                    );
                  })}
                </pre>
              </div>
            )}

          </div>
        </div>
      </main>
    )
}

export default AIcomponent;