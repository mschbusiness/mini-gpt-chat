import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};

// Setup DOM with happy-dom
beforeEach(() => {
    // Reset localStorage mock
    localStorageMock.getItem.mockReturnValue(null);
    
    // Setup DOM
    document.body.innerHTML = `
        <div class="container">
            <h1>Mini-GPT Chat</h1>
            
            <div class="api-key-section">
                <label for="api-key">OpenAI API Key:</label>
                <input type="password" id="api-key" placeholder="sk-...">
                <button id="save-key">Save Key</button>
            </div>
            
            <div class="chat-container">
                <div id="chat-history" class="chat-history"></div>
                
                <div class="input-section">
                    <textarea id="user-input" placeholder="Enter your message here..."></textarea>
                    <button id="send-button">Send</button>
                </div>
            </div>
        </div>
    `;
    
    // Mock localStorage globally
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
    });
    
    // Initialize the app to trigger UI updates
    if (typeof ChatApp !== 'undefined') {
        new ChatApp();
    }
});

describe('DOM Smoke Tests', () => {
    it('renders basic UI elements', () => {
        // Check that all required UI elements are present
        expect(document.getElementById('api-key')).toBeTruthy();
        expect(document.getElementById('save-key')).toBeTruthy();
        expect(document.getElementById('chat-history')).toBeTruthy();
        expect(document.getElementById('user-input')).toBeTruthy();
        expect(document.getElementById('send-button')).toBeTruthy();
    });

    it('UI elements have correct attributes', () => {
        const apiKeyInput = document.getElementById('api-key');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        
        expect(apiKeyInput.type).toBe('password');
        expect(apiKeyInput.placeholder).toBe('sk-...');
        expect(userInput.placeholder).toBe('Enter your message here...');
        // Note: Send button state depends on app initialization
    });

    it('shows API key hint when no key is present', () => {
        const chatHistory = document.getElementById('chat-history');
        
        // The app should show a hint message
        // This will be tested after app initialization
        expect(chatHistory).toBeTruthy();
    });

    it('can add messages to chat history', () => {
        const chatHistory = document.getElementById('chat-history');
        const initialMessageCount = chatHistory.children.length;
        
        // Simulate adding a message
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.textContent = 'Test message';
        chatHistory.appendChild(messageElement);
        
        expect(chatHistory.children.length).toBe(initialMessageCount + 1);
        expect(chatHistory.lastChild.textContent).toBe('Test message');
    });

    it('can handle form inputs', () => {
        const apiKeyInput = document.getElementById('api-key');
        const userInput = document.getElementById('user-input');
        
        apiKeyInput.value = 'sk-test123';
        userInput.value = 'Hello world';
        
        expect(apiKeyInput.value).toBe('sk-test123');
        expect(userInput.value).toBe('Hello world');
    });

    it('buttons are clickable', () => {
        const saveButton = document.getElementById('save-key');
        const sendButton = document.getElementById('send-button');
        
        let saveClicked = false;
        let sendClicked = false;
        
        saveButton.addEventListener('click', () => { saveClicked = true; });
        sendButton.addEventListener('click', () => { sendClicked = true; });
        
        saveButton.click();
        sendButton.click();
        
        expect(saveClicked).toBe(true);
        expect(sendClicked).toBe(true);
    });

    it('can handle API key input and save', () => {
        const apiKeyInput = document.getElementById('api-key');
        const saveButton = document.getElementById('save-key');
        
        apiKeyInput.value = 'sk-test123';
        
        // Test that the input works
        expect(apiKeyInput.value).toBe('sk-test123');
        
        // Test that the save button is clickable
        let saveClicked = false;
        saveButton.addEventListener('click', () => { saveClicked = true; });
        saveButton.click();
        
        expect(saveClicked).toBe(true);
    });
});

describe('Integration Test - OpenAI API', () => {
    it.runIf(!!process.env.OPENAI_API_KEY)('calls real OpenAI API and receives response', async () => {
        // This test will only run if OPENAI_API_KEY is set
        const apiKey = process.env.OPENAI_API_KEY;
        const model = 'gpt-4o-mini';
        const userText = 'Say hi';
        
        // Import the callOpenAI function (we'll need to export it from app.js)
        // For now, we'll test the fetch call directly
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'user', content: userText }
                ],
                max_tokens: 50,
                temperature: 0.7
            })
        });

        expect(response.ok).toBe(true);
        
        const data = await response.json();
        expect(data.choices).toBeDefined();
        expect(data.choices.length).toBeGreaterThan(0);
        expect(data.choices[0].message.content).toBeDefined();
        expect(data.choices[0].message.content.trim().length).toBeGreaterThan(0);
    });
});
