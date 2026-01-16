const fs = require('fs');
const path = require('path');

// Configuration pour projet Next.js
const CONFIG = {
    outputFile: 'project-context.txt',
    maxFileSize: 500000, // 500KB max par fichier

    // Extensions de fichiers à inclure pour Next.js
    includeExtensions: [
        '.js', '.jsx', '.ts', '.tsx', '.json', '.md',
        '.css', '.scss', '.sass', '.less',
        '.html', '.yml', '.yaml', '.env', '.env.local',
        '.config.js', '.config.ts', '.eslintrc', '.prettierrc'
    ],

    // Dossiers à exclure
    excludeDirs: [
        'node_modules', '.next', '.git', '.idea',
        'build', 'dist', 'out', '.turbo', 'coverage',
        '.vscode', '.husky', '__tests__', '__mocks__'
    ],

    // Fichiers spécifiques à toujours inclure
    alwaysInclude: [
        'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
        'next.config.js', 'next.config.mjs', 'next.config.ts',
        'tsconfig.json', 'jsconfig.json',
        'tailwind.config.js', 'tailwind.config.ts',
        'postcss.config.js', 'postcss.config.mjs',
        '.eslintrc.js', '.eslintrc.json', 'eslint.config.js',
        '.prettierrc', '.prettierrc.json',
        'README.md', 'CHANGELOG.md',
        '.env.example', '.env.local.example',
        '.gitignore', '.dockerignore',
        'Dockerfile', 'docker-compose.yml'
    ],

    // Dossiers importants à scanner en priorité
    priorityDirs: [
        'src', 'app', 'pages', 'components', 'lib',
        'utils', 'hooks', 'styles', 'public',
        'api', 'types', 'interfaces', 'models',
        'services', 'context', 'store'
    ]
};

class NextJsContextGenerator {
    constructor() {
        this.output = [];
        this.fileCount = 0;
        this.totalSize = 0;
        this.filesByType = {};
    }

    shouldIncludeFile(filePath, fileName) {
        // Ignorer les fichiers de test
        if (fileName.includes('.test.') || fileName.includes('.spec.')) {
            return false;
        }

        // Toujours inclure les fichiers spécifiques
        if (CONFIG.alwaysInclude.includes(fileName)) {
            return true;
        }

        // Vérifier l'extension
        const ext = path.extname(fileName).toLowerCase();
        return CONFIG.includeExtensions.includes(ext) ||
            CONFIG.includeExtensions.some(allowed => fileName.endsWith(allowed));
    }

    shouldExcludeDir(dirName) {
        return CONFIG.excludeDirs.some(excluded =>
            dirName.toLowerCase() === excluded.toLowerCase() ||
            dirName.toLowerCase().startsWith(excluded.toLowerCase())
        );
    }

    addSection(title, content = '') {
        this.output.push('\n' + '='.repeat(80));
        this.output.push(title);
        this.output.push('='.repeat(80));
        if (content) {
            this.output.push(content);
        }
        this.output.push('');
    }

    addFileContent(filePath, relativePath) {
        try {
            const stats = fs.statSync(filePath);

            // Ignorer les fichiers trop volumineux
            if (stats.size > CONFIG.maxFileSize) {
                console.log(`⚠️  Fichier trop volumineux ignoré: ${relativePath} (${this.formatSize(stats.size)})`);
                return;
            }

            const content = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).toLowerCase();

            // Suivre les types de fichiers
            this.filesByType[ext] = (this.filesByType[ext] || 0) + 1;

            this.output.push(`\n${'─'.repeat(80)}`);
            this.output.push(`FICHIER: ${relativePath}`);
            this.output.push(`TYPE: ${ext || 'sans extension'}`);
            this.output.push(`TAILLE: ${this.formatSize(stats.size)}`);
            this.output.push('─'.repeat(80));
            this.output.push(content);
            this.output.push('');

            this.fileCount++;
            this.totalSize += stats.size;

        } catch (error) {
            console.error(`❌ Erreur lecture ${relativePath}: ${error.message}`);
        }
    }

    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    }

    generateTree(dir, prefix = '', relativePath = '') {
        let tree = [];

        try {
            const items = fs.readdirSync(dir).sort();

            items.forEach((item, index) => {
                const fullPath = path.join(dir, item);
                const itemRelativePath = path.join(relativePath, item);
                const isLast = index === items.length - 1;
                const stats = fs.statSync(fullPath);

                const connector = isLast ? '└── ' : '├── ';
                const extension = prefix + connector;

                if (stats.isDirectory()) {
                    if (!this.shouldExcludeDir(item)) {
                        // Marquer les dossiers prioritaires
                        const isPriority = CONFIG.priorityDirs.includes(item);
                        const mark = isPriority ? ' 📁' : '';
                        tree.push(extension + item + '/' + mark);
                        const childPrefix = prefix + (isLast ? '    ' : '│   ');
                        tree = tree.concat(this.generateTree(fullPath, childPrefix, itemRelativePath));
                    }
                } else {
                    // Marquer les fichiers importants
                    const isImportant = CONFIG.alwaysInclude.includes(item);
                    const mark = isImportant ? ' ⭐' : '';
                    tree.push(extension + item + mark);
                }
            });
        } catch (error) {
            console.error(`❌ Erreur lecture dossier ${dir}: ${error.message}`);
        }

        return tree;
    }

    scanDirectory(dir, relativePath = '') {
        try {
            const items = fs.readdirSync(dir).sort();

            items.forEach(item => {
                const fullPath = path.join(dir, item);
                const itemRelativePath = path.join(relativePath, item);
                const stats = fs.statSync(fullPath);

                if (stats.isDirectory()) {
                    if (!this.shouldExcludeDir(item)) {
                        this.scanDirectory(fullPath, itemRelativePath);
                    }
                } else {
                    if (this.shouldIncludeFile(fullPath, item)) {
                        this.addFileContent(fullPath, itemRelativePath);
                    }
                }
            });
        } catch (error) {
            console.error(`❌ Erreur scan ${dir}: ${error.message}`);
        }
    }

    detectProjectInfo(projectRoot) {
        const info = {
            framework: 'Next.js',
            typescript: false,
            styling: [],
            stateManagement: [],
            testing: []
        };

        const packageJsonPath = path.join(projectRoot, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

                // Détecter TypeScript
                info.typescript = 'typescript' in deps;

                // Détecter le styling
                if ('tailwindcss' in deps) info.styling.push('Tailwind CSS');
                if ('styled-components' in deps) info.styling.push('Styled Components');
                if ('@emotion/react' in deps) info.styling.push('Emotion');
                if ('sass' in deps || 'node-sass' in deps) info.styling.push('Sass');

                // Détecter la gestion d'état
                if ('redux' in deps || '@reduxjs/toolkit' in deps) info.stateManagement.push('Redux');
                if ('zustand' in deps) info.stateManagement.push('Zustand');
                if ('jotai' in deps) info.stateManagement.push('Jotai');
                if ('recoil' in deps) info.stateManagement.push('Recoil');

                // Détecter les outils de test
                if ('jest' in deps) info.testing.push('Jest');
                if ('@testing-library/react' in deps) info.testing.push('React Testing Library');
                if ('cypress' in deps) info.testing.push('Cypress');
                if ('playwright' in deps) info.testing.push('Playwright');

            } catch (error) {
                console.error('❌ Erreur lecture package.json:', error.message);
            }
        }

        return info;
    }

    generate(projectRoot = '.') {
        console.log('🚀 Génération du contexte du projet Next.js...\n');

        const projectName = path.basename(path.resolve(projectRoot));
        const timestamp = new Date().toISOString();
        const projectInfo = this.detectProjectInfo(projectRoot);

        // En-tête avec info projet
        let headerInfo = `Projet: ${projectName}\n` +
            `Date de génération: ${timestamp}\n` +
            `Chemin: ${path.resolve(projectRoot)}\n` +
            `Framework: ${projectInfo.framework}\n` +
            `TypeScript: ${projectInfo.typescript ? 'Oui' : 'Non'}`;

        if (projectInfo.styling.length > 0) {
            headerInfo += `\nStyling: ${projectInfo.styling.join(', ')}`;
        }
        if (projectInfo.stateManagement.length > 0) {
            headerInfo += `\nGestion d'état: ${projectInfo.stateManagement.join(', ')}`;
        }
        if (projectInfo.testing.length > 0) {
            headerInfo += `\nTests: ${projectInfo.testing.join(', ')}`;
        }

        this.addSection('CONTEXTE DU PROJET NEXT.JS', headerInfo);

        // Arborescence
        this.addSection('STRUCTURE DU PROJET (📁 = dossiers importants, ⭐ = fichiers clés)');
        const tree = this.generateTree(projectRoot);
        this.output.push(projectName + '/');
        this.output = this.output.concat(tree);

        // Contenu des fichiers
        this.addSection('CONTENU DES FICHIERS');
        this.scanDirectory(projectRoot);

        // Statistiques détaillées
        let statsText = `Nombre de fichiers analysés: ${this.fileCount}\n` +
            `Taille totale: ${this.formatSize(this.totalSize)}\n\n` +
            `Répartition par type de fichier:\n`;

        const sortedTypes = Object.entries(this.filesByType)
            .sort((a, b) => b[1] - a[1]);

        sortedTypes.forEach(([ext, count]) => {
            statsText += `  ${ext || 'sans extension'}: ${count} fichier${count > 1 ? 's' : ''}\n`;
        });

        this.addSection('STATISTIQUES', statsText);

        // Écriture du fichier
        const outputPath = path.join(projectRoot, CONFIG.outputFile);
        fs.writeFileSync(outputPath, this.output.join('\n'), 'utf8');

        console.log('\n✅ Contexte généré avec succès!');
        console.log(`📁 Fichier: ${outputPath}`);
        console.log(`📊 Fichiers analysés: ${this.fileCount}`);
        console.log(`💾 Taille totale: ${this.formatSize(this.totalSize)}`);
        console.log(`📄 Taille du fichier de sortie: ${this.formatSize(fs.statSync(outputPath).size)}`);
        console.log(`\n🔍 Types de fichiers détectés:`);
        sortedTypes.slice(0, 5).forEach(([ext, count]) => {
            console.log(`   ${ext || 'sans extension'}: ${count}`);
        });
    }
}

// Exécution
if (require.main === module) {
    const projectRoot = process.argv[2] || '.';
    const generator = new NextJsContextGenerator();
    generator.generate(projectRoot);
}

module.exports = NextJsContextGenerator;