// Mini-GPT Chat Application
class ChatApp {
    constructor() {
        this.apiKey = localStorage.getItem('openai_api_key') || '';
        this.chatHistory = [];
        this.initializeElements();
        this.attachEventListeners();
        this.updateUI();
    }

    initializeElements() {
        this.apiKeyInput = document.getElementById('api-key');
        this.saveKeyButton = document.getElementById('save-key');
        this.chatHistoryElement = document.getElementById('chat-history');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
    }

    attachEventListeners() {
        this.saveKeyButton.addEventListener('click', () => this.saveApiKey());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    saveApiKey() {
        const key = this.apiKeyInput.value.trim();
        if (key) {
            this.apiKey = key;
            localStorage.setItem('openai_api_key', key);
            this.updateUI();
            this.showMessage('API Key saved successfully!', 'success');
        } else {
            this.showMessage('Please enter a valid API key', 'error');
        }
    }

    updateUI() {
        this.apiKeyInput.value = this.apiKey;
        this.sendButton.disabled = !this.apiKey;
        
        if (!this.apiKey) {
            this.showMessage('Please enter your OpenAI API key to start chatting', 'info');
        }
    }

    async sendMessage() {
        if (!this.apiKey) {
            this.showMessage('Please enter your OpenAI API key first', 'error');
            return;
        }

        const userText = this.userInput.value.trim();
        if (!userText) {
            this.showMessage('Please enter a message', 'error');
            return;
        }

        // Add user message to chat
        this.addMessageToChat(userText, 'user');
        this.userInput.value = '';
        this.sendButton.disabled = true;

        // Show loading indicator
        const loadingId = this.addMessageToChat('Thinking...', 'assistant', true);

        try {
            const response = await this.callOpenAI(this.apiKey, 'gpt-4o-mini', userText);
            
            // Remove loading message and add actual response
            this.removeMessage(loadingId);
            this.addMessageToChat(response, 'assistant');
        } catch (error) {
            this.removeMessage(loadingId);
            this.addMessageToChat(`Error: ${error.message}`, 'assistant', false, true);
        } finally {
            this.sendButton.disabled = false;
        }
    }

    async callOpenAI(apiKey, model, userText) {
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
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    addMessageToChat(message, sender, isLoading = false, isError = false) {
        const messageId = Date.now() + Math.random();
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.id = `message-${messageId}`;
        
        if (isLoading) {
            messageElement.classList.add('loading');
        }
        if (isError) {
            messageElement.classList.add('error');
        }
        
        messageElement.textContent = message;
        this.chatHistoryElement.appendChild(messageElement);
        this.chatHistoryElement.scrollTop = this.chatHistoryElement.scrollHeight;
        
        return messageId;
    }

    removeMessage(messageId) {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.remove();
        }
    }

    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        // Insert at the top of chat history
        this.chatHistoryElement.insertBefore(messageElement, this.chatHistoryElement.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
