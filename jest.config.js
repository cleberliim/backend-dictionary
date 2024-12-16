module.exports = {
    // Caminho onde o Jest deve procurar os testes
    roots: [ './tests/' ], // Ajuste o diretório onde seus testes estão localizados

    // Ambiente de teste (pode ser 'node' para backend ou 'jsdom' para frontend)
    testEnvironment: 'node', // Use 'node' para backend ou 'jsdom' para frontend (React)

    // Ignorar diretórios como node_modules durante a execução dos testes
    testPathIgnorePatterns: [ '/node_modules/', '/dist/' ], // Ignora pastas como node_modules e dist

    // Configuração para arquivos de teste, reconhecendo js, jsx, ts, e tsx
    moduleFileExtensions: [ 'js', 'jsx', 'ts', 'tsx', 'json', 'node' ],

    // Transforma arquivos TypeScript ou JavaScript usando 'ts-jest' ou 'babel-jest'
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Usando ts-jest para transformar arquivos TypeScript
        '^.+\\.(js|jsx)$': 'babel-jest', // Usando babel-jest para transformar arquivos JavaScript
    },

    // Coletar cobertura de código
    collectCoverage: true,
    coverageDirectory: 'coverage', // Diretório onde os relatórios de cobertura serão gerados

    // Timeout de cada teste (em milissegundos)
    testTimeout: 10000, // 10 segundos de timeout por teste
};
