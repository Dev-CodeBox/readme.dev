import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import axios from 'axios';
import generateMarkdown from '../utils/GenerateMarkdown.jsx';
import BuyMeACoffee from '../utils/BuyMeACoffee';

function Editor() {
    const defaultSections = {
        projectTitle: '',
        description: '',
        logo: '',
        demo: '',
        features: '',
        installation: '',
        usageExamples: '',
        screenshots: '',
        tech: '',
        runLocally: '',
        deployment: '',
        environmentVariables: '',
        apiReference: '',
        contributing: '',
        license: '',
        author: '',
        acknowledgements: ''
    };

    const [markdownData, setMarkdownData] = useState({ ...defaultSections });
    const [activeField, setActiveField] = useState('projectTitle');
    const [activeTab, setActiveTab] = useState('preview');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isDownloadFailedModalOpen, setIsDownloadFailedModalOpen] = useState(false);
    const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [newSectionName, setNewSectionName] = useState('');
    const [labels, setLabels] = useState({
        projectTitle: 'Project Title',
        description: 'Description',
        logo: 'Logo URL',
        demo: 'Demo Link',
        features: 'Features',
        installation: 'Installation Guide',
        usageExamples: 'Usage Examples',
        screenshots: 'Screenshot URLs',
        tech: 'Tech Stack',
        runLocally: 'Run Locally',
        deployment: 'Deployment',
        environmentVariables: 'Environment Variables',
        apiReference: 'API Reference',
        contributing: 'Contributing',
        license: 'License',
        author: 'Author',
        acknowledgements: 'Acknowledgements'
    });

    const navigate = useNavigate();

    const markdownOutput = generateMarkdown(markdownData);

    const handleChange = (e) => {
        setMarkdownData({ ...markdownData, [activeField]: e.target.value });
    };

    const handleAddCustomSection = () => {
        setIsModalOpen(true);
    };

    const addSection = () => {
        const rawName = newSectionName.trim();
        if (!rawName) return;

        const key = rawName.replace(/\s+/g, '-').toLowerCase();

        if (markdownData[key]) {
            alert('Section already exists!');
            return;
        }

        setMarkdownData((prev) => ({ ...prev, [key]: '' }));

        setLabels((prev) => ({
            ...prev,
            [key]: rawName.replace(/\b\w/g, (c) => c.toUpperCase())
        }));

        setNewSectionName('');
        setIsModalOpen(false);
    };

    const handleDownload = async () => {
        const isEmpty = Object.values(markdownData).every(val => !val || val.trim() === '');

        if (isEmpty) {
            setIsEmptyModalOpen(true);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/generate`,
                markdownData,
                { responseType: 'blob' }
            );

            const blob = new Blob([response.data], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'README.md';
            a.click();
            window.URL.revokeObjectURL(url);

            setIsDownloadModalOpen(true);
        } catch (error) {
            console.error('Download failed:', error);
            setIsDownloadFailedModalOpen(true);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(markdownOutput || '');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    useEffect(() => {
        const handleKey = (e) => {
            if (!isModalOpen) return;
            if (e.key === 'Escape') setIsModalOpen(false);
            if (e.key === 'Enter') addSection();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isModalOpen, newSectionName]);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#f5f6f8] dark:bg-[#1a1b1f] text-[#2E2C2F] dark:text-gray-100">
            <aside className="w-full lg:w-64 bg-white dark:bg-[#22252a] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex flex-col relative">
                <div className="sticky top-0 z-20 bg-white dark:bg-[#22252a] p-4.5 border-b border-gray-300 dark:border-gray-600">
                    <button
                        className="w-full text-left text-lg font-semibold text-[#2E2C2F] dark:text-white"
                        disabled
                    >
                        Markdown Sections
                    </button>
                </div>
                <ul className="flex-1 overflow-y-auto p-4 space-y-2 ">
                    {Object.keys(markdownData).map((key) => (
                        <li
                            key={key}
                            onClick={() => setActiveField(key)}
                            className={`p-2 rounded cursor-pointer font-medium transition ${activeField === key
                                ? 'bg-[#f5f6f8] dark:bg-[#2c2f36]'
                                : 'hover:bg-gray-100 dark:hover:bg-[#2f3136]'
                                }`}
                        >
                            {labels[key] || key}
                        </li>
                    ))}
                </ul>
                <div className="sticky bottom-0 z-20 bg-white dark:bg-[#22252a] p-5 border-t border-gray-300 dark:border-gray-600">
                    <button
                        onClick={handleAddCustomSection}
                        className="w-full py-2 px-4 text-sm text-center bg-[#FFB703] hover:bg-[#e6a700] text-black font-medium rounded cursor-pointer"
                    >
                        Add New Section
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-[#22252a] rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                                <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Custom Section</h3>
                                <input
                                    autoFocus
                                    type="text"
                                    value={newSectionName}
                                    onChange={(e) => setNewSectionName(e.target.value)}
                                    placeholder="Enter section name"
                                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#1a1b1f] dark:text-white outline-none mb-4"
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={addSection}
                                        className="px-4 py-2 rounded text-sm bg-[#FFB703] hover:bg-[#e6a700] text-black font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center bg-white dark:bg-[#22252a] p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">Editor</span>
                        <button onClick={() => window.location.reload()} className="text-sm text-red-500 hover:underline cursor-pointer">
                            Reset
                        </button>
                        <button onClick={() => navigate('/')} className="text-sm text-red-500 hover:underline cursor-pointer">
                            Home
                        </button>
                    </div>
                    <button onClick={handleDownload}
                        className="bg-[#FFB703] hover:bg-[#e6a700] text-black px-4 py-2 rounded font-medium transition cursor-pointer">
                        Download
                    </button>
                    {isDownloadModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-[#22252a] rounded-lg shadow-lg p-6 w-full max-w-md mx-4 text-center">
                                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                                    README.md Downloaded
                                </h3>
                                <p className="dark:text-gray-300 mb-4">
                                    Thank you for using our generator!
                                </p>
                                <div className="flex justify-center gap-4 mb-4">
                                    <a
                                        href={import.meta.env.VITE_DONATION_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-300 transition cursor-pointer"
                                    >
                                        ☕ Buy me a coffee
                                    </a>
                                    <a
                                        href={import.meta.env.VITE_GITHUB_SPONSOR_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-[#1c1c1c] text-white px-4 py-2 rounded-full hover:bg-[#333] transition cursor-pointer"
                                    >
                                        💖 Sponsor
                                    </a>
                                </div>
                                <button
                                    onClick={() => setIsDownloadModalOpen(false)}
                                    className="px-4 py-2 rounded text-sm bg-[#FFB703] hover:bg-[#e6a700] text-black font-semibold cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                    {isDownloadFailedModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-[#22252a] rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                                    🛑 Download Failed
                                </h3>
                                <p className="dark:text-gray-300 mb-4">
                                    Failed to download README.md
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsDownloadFailedModalOpen(false)}
                                        className="px-4 py-2 rounded text-sm bg-[#FFB703] hover:bg-[#e6a700] text-black font-semibold cursor-pointer"
                                    >
                                        Got it
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {isEmptyModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-[#22252a] rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                                    ⚠️ Cannot Download
                                </h3>
                                <p className="dark:text-gray-300 mb-4">
                                    Please fill at least one field before downloading the README file.
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsEmptyModalOpen(false)}
                                        className="px-4 py-2 rounded text-sm bg-[#FFB703] hover:bg-[#e6a700] text-black font-semibold cursor-pointer"
                                    >
                                        Got it
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                    <textarea
                        value={markdownData[activeField]}
                        onChange={handleChange}
                        placeholder={`Write ${labels[activeField]} here...`}
                        className="w-full lg:w-1/2 p-4 bg-[#1a1b1f] text-white font-mono text-sm outline-none resize-none overflow-auto break-words"
                    />
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="flex bg-white dark:bg-[#22252a] border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`py-2 px-4 font-semibold transition cursor-pointer ${activeTab === 'preview'
                                    ? 'text-[#FFB703] border-b-2 border-[#FFB703]'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('raw')}
                                className={`py-2 px-4 font-semibold transition cursor-pointer ${activeTab === 'raw'
                                    ? 'text-[#FFB703] border-b-2 border-[#FFB703]'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                Raw
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto bg-white dark:bg-[#121212] p-4 relative">
                            {activeTab === 'preview' ? (
                                <div
                                    className="markdown-body dark:bg-[#121212]"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        height: '100%',
                                        overflowY: 'auto'
                                    }}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {markdownOutput}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="h-full">
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-4 right-6 text-sm text-[#FFB703] hover:underline flex items-center gap-2 cursor-pointer"
                                    >
                                        <FaCopy />
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                    <pre className="whitespace-pre-wrap text-sm font-mono bg-[#1a1b1f] text-white p-4 rounded overflow-x-auto h-full">
                                        {markdownOutput}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BuyMeACoffee position="bottom-4" />
        </div>
    );
}

export default Editor;
