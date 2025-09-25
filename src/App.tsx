import React, { useState } from 'react';
import { Brain, Sparkles, FileText } from 'lucide-react';
import FileUpload from './components/FileUpload';
import SummaryDisplay from './components/SummaryDisplay';
import Login from './components/Login';
import { generateDocumentSummary } from './services/geminiService';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    setSelectedFileName(file.name);
    setSummary('');

    try {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt|md)$/i)) {
        throw new Error('Please upload a PDF, DOC, DOCX, TXT, or MD file.');
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB.');
      }

      const result = await generateDocumentSummary({ file });
      setSummary(result.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the document.');
      console.error('Error processing document:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Document Summarizer
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload any document and get an intelligent AI-generated summary powered by Google Gemini
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Upload Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Upload Your Document
              </h2>
              <p className="text-gray-600">
                Drag and drop or click to select a file for summarization
              </p>
            </div>
            
            <FileUpload
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              error={error}
            />
          </section>

          {/* Summary Section */}
          {(summary || isProcessing) && (
            <section>
              <SummaryDisplay
                summary={summary}
                fileName={selectedFileName}
                isProcessing={isProcessing}
              />
            </section>
          )}

          {/* Features Section */}
          {!summary && !isProcessing && (
            <section className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Powerful Document Analysis
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our AI-powered summarizer extracts key insights from your documents
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-gray-600">
                    Support for PDF, DOC, DOCX, TXT, and Markdown files
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-gray-600">
                    Advanced natural language processing for accurate summaries
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Smart Analysis
                  </h3>
                  <p className="text-gray-600">
                    Extracts key points, themes, and actionable insights
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Powered by Google Gemini AI • Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;