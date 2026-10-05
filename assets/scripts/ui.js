export function renderJobCards(reports, containerElement) {
    if (!containerElement) return;

    containerElement.innerHTML = '';

    if (!reports || reports.length === 0) {
        containerElement.innerHTML = '<p class="no-results">Nenhum resultado de compatibilidade disponível.</p>';
        return;
    }

    reports.forEach(report => {
        const card = document.createElement('article');
        card.className = `job-card ${report.matchClass || 'medium-match'}`;

        const found = report.found || [];
        const missing = report.missing || [];

        const foundSkillsStr = found.length > 0 ? found.join(', ') : 'Nenhuma';
        const missingSkillsStr = missing.length > 0 ? missing.join(', ') : 'Nenhuma (100% Match!)';

        card.innerHTML = `
            <h3>${report.job.position}</h3>
            <p><strong>Empresa:</strong> ${report.job.company}</p>
            <p><strong>Senioridade:</strong> ${report.job.seniority || 'Não definida'} | <strong>Modalidade:</strong> ${report.job.modality}</p>
            <p><strong>Local:</strong> ${report.job.location} | <strong>Salário:</strong> ${report.job.salary}</p>
            <p class="match-badge"><strong>Compatibilidade:</strong> ${report.percentage}% (${report.classification || 'Média'})</p>
            <p><strong>Competências Encontradas:</strong> <span class="skills-ok">${foundSkillsStr}</span></p>
            <p><strong>Competências Faltantes:</strong> <span class="skills-missing">${missingSkillsStr}</span></p>
        `;

        containerElement.appendChild(card);
    });
}

export function renderStudyRecommendation(recommendationText, containerElement) {
    if (!containerElement) return;
    containerElement.innerHTML = `<p>${recommendationText}</p>`;
}

export function updateAnalysisCounter(count, displayElement) {
    if (!displayElement) return;
    displayElement.textContent = `Análises realizadas: ${count}`;
}