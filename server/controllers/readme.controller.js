const generateMarkdown = require('../utils/generate.markdown');

const readmeController = (req, res) => {
    try {
        const markdownData = req.body;

        if (!markdownData || typeof markdownData !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Invalid markdown data'
            });
        }
        const markdownContent = generateMarkdown(markdownData);

        res.setHeader('Content-Disposition', `attachment; filename=README.md`);
        res.setHeader('Content-Type', 'text/markdown');
        res.send(markdownContent);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = readmeController;