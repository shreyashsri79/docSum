import React from 'react';
import { FileText, Clock, Copy, CheckCircle } from 'lucide-react';

interface SummaryDisplayProps {
  summary: string;
  fileName: string;
  isProcessing: boolean;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, fileName, isProcessing }) => {
  const [copied, setCopied] = React.useState(false);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isProcessing) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-semibold">Document Summary</h2>
                <p className="text-blue-100 text-sm">{fileName}</p>
              </div>
            </div>
            <button
              onClick={copySummary}
              className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center space-x-2 text-gray-500 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Generated {new Date().toLocaleString()}</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;