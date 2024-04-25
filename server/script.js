const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#submit");

const getChatResponse = async (data) => {

    const message = data;
    console.log(message);
      const url = "http:localhost:3000/api/control"
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
            body: JSON.stringify({ message: message }) // Convert the data object to a JSON string
        };
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Response from server:', data);
            // Handle the response from the server
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors
        });
}



const handleAPI = () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = ""; // Clear the input field

    getChatResponse(userText);
}

sendButton.addEventListener("click", handleAPI);