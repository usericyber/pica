const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = "https://backend.craiyon.com/generate";

const form = document.getElementById('image-form');
const promptInput = document.getElementById('prompt-input');
const generateBtn = document.getElementById('generate-btn');
const loadingText = document.getElementById('loading');
const generatedImage = document.getElementById('generated-image');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const prompt = promptInput.value;
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    // Show loading state and hide previous image
    loadingText.classList.remove('hidden');
    generatedImage.classList.add('hidden');
    generateBtn.disabled = true;

    try {
        const response = await fetch(PROXY_URL + API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Craiyon's API returns a base64 encoded image array
        // We'll just use the first image in the array
        const base64Image = data.images[0];
        
        // The URL format for a base64 image
        const imageUrl = `data:image/webp;base64,${base64Image}`;
        
        // Display the generated image
        generatedImage.src = imageUrl;
        generatedImage.classList.remove('hidden');
    } catch (error) {
        console.error("Error generating image:", error);
        alert("Failed to generate image. Please check the console for details.");
    } finally {
        // Hide loading and re-enable button
        loadingText.classList.add('hidden');
        generateBtn.disabled = false;
    }
});
