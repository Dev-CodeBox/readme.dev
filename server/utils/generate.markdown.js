const generateMarkdown = (data) => {
    const defaultOrder = [
        'projectTitle',
        'description',
        'logo',
        'demo',
        'features',
        'installation',
        'usageExamples',
        'screenshots',
        'tech',
        'runLocally',
        'deployment',
        'environmentVariables',
        'apiReference',
        'contributing',
        'license',
        'authors',
        'acknowledgements',
    ];

    const rendered = [];

    const {
        projectTitle,
        description,
        logo,
        demo,
        features,
        installation,
        usageExamples,
        screenshots,
        tech,
        runLocally,
        deployment,
        environmentVariables,
        apiReference,
        contributing,
        license,
        authors,
        acknowledgements,
        ...customSections
    } = data;

    if (logo) rendered.push(`![Logo](${logo})`);
    if (projectTitle) rendered.push(`# ${projectTitle}`);
    if (description) rendered.push(`#### ${description}`);
    if (demo) rendered.push(`## Demo\n[Click here to view demo](${demo})`);
    if (features) rendered.push(`## Features\n${features.split('\n').map(f => `- ${f}`).join('\n')}`);
    if (installation) rendered.push(`## Installation\n\`\`\`bash\n${installation}\n\`\`\``);
    if (usageExamples) rendered.push(`## Usage\n\`\`\`js\n${usageExamples}\n\`\`\``);
    if (screenshots) rendered.push(`## Screenshots\n${screenshots.split('\n').map(s => `![Screenshot](${s})`).join('\n')}`);
    if (tech) rendered.push(`## Tech Stack\n${tech.split('\n').map(t => `- ${t}`).join('\n')}`);
    if (runLocally) rendered.push(`## Run Locally\n\`\`\`bash\n${runLocally}\n\`\`\``);
    if (deployment) rendered.push(`## Deployment\n${deployment}`);
    if (environmentVariables) rendered.push(`## Environment Variables\n${environmentVariables.split('\n').map(e => `- \`${e}\``).join('\n')}`);
    if (apiReference) rendered.push(`## API Reference\n\`\`\`json\n${apiReference}\n\`\`\``);
    if (contributing) rendered.push(`## Contributing\n${contributing}`);
    if (license) rendered.push(`## License\n${license}`);
    if (authors) rendered.push(`## Authors\n${authors.split('\n').map(a => `- ${a}`).join('\n')}`);
    if (acknowledgements) rendered.push(`## Acknowledgements\n${acknowledgements.split('\n').map(a => `- ${a}`).join('\n')}`);

    const customKeys = Object.keys(data).filter(key => !defaultOrder.includes(key));
    customKeys.forEach((key) => {
        const value = data[key];
        if (value && value.trim()) {
            rendered.push(`## ${key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n${value}`);
        }
    });

    return rendered.join('\n\n').trim();
};

module.exports = generateMarkdown;
