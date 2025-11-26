from langchain_ollama import OllamaEmbeddings



def embedding_function():
    # Initialize Ollama Embeddings with the specified model
    embeddings = OllamaEmbeddings(model="mxbai-embed-large:latest") 
    return embeddings
