import { fetchJobs, loadPerfilLocalStorage, savePerfilLocalStorage } from './dados.js';
import { Candidate, MatchAnalyzer, createJobCounter, executeWithCallback } from './motor.js';
import { renderJobCards, renderStudyRecommendation, updateAnalysisCounter } from './ui.js';

const incrementCounter = createJobCounter();

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Recrutando Você inicializado via Módulos ES.");

    const statusContainer = document.getElementById('status-container');
    const resultsContainer = document.getElementById('results-container');
    const recommendationContainer = document.getElementById('recommendation-container');
    const counterDisplay = document.getElementById('counter-display');
    const form = document.getElementById('match-form');
    
    const nameInput = document.getElementById('candidate-name');
    const areaInput = document.getElementById('candidate-area');
    const experienceInput = document.getElementById('candidate-experience');
    const skillsInput = document.getElementById('candidate-skills');
    const errorDiv = document.getElementById('form-error');

    if (experienceInput) {
        experienceInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.,]/g, '');
        });
    }

    const jobs = await fetchJobs(statusContainer);

    const savedProfile = loadPerfilLocalStorage();
    if (savedProfile) {
        nameInput.value = savedProfile.nome || '';
        areaInput.value = savedProfile.area || '';
        experienceInput.value = savedProfile.experiencia !== undefined ? savedProfile.experiencia : '';
        skillsInput.value = savedProfile.habilidades ? savedProfile.habilidades.join(', ') : '';
        
        if (jobs.length > 0 && savedProfile.habilidades) {
            const candidate = new Candidate(savedProfile.nome, savedProfile.area, savedProfile.habilidades, savedProfile.experiencia);
            executeAnalysisFlow(candidate, jobs, resultsContainer, recommendationContainer, counterDisplay);
        }
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            errorDiv.textContent = '';

            const name = nameInput.value.trim();
            const area = areaInput.value.trim();
            const experienceRaw = experienceInput.value.trim().replace(',', '.');
            const experienceVal = parseFloat(experienceRaw);
            const rawSkills = skillsInput.value.trim();

            if (!name || !area || isNaN(experienceVal) || experienceVal < 0 || !rawSkills) {
                errorDiv.textContent = 'Por favor, preencha todos os campos obrigatórios com valores válidos.';
                return;
            }

            const skillsArray = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
            if (skillsArray.length === 0) {
                errorDiv.textContent = 'Insira pelo menos uma competência válida separada por vírgula.';
                return;
            }

            const candidate = new Candidate(name, area, skillsArray, experienceVal);

            savePerfilLocalStorage({
                nome: candidate.name,
                area: candidate.area,
                experiencia: candidate.experience,
                habilidades: candidate.skills
            });

            executeAnalysisFlow(candidate, jobs, resultsContainer, recommendationContainer, counterDisplay);
        });
    }
});

function executeAnalysisFlow(candidate, jobs, resultsContainer, recommendationContainer, counterDisplay) {
    executeWithCallback("A processar compatibilidade de competências...", () => {
        const analyzer = new MatchAnalyzer(jobs, candidate);
        const reports = analyzer.processReports();
        const recommendation = analyzer.getBestRecommendation(reports);

        const totalAnalyses = incrementCounter();
        updateAnalysisCounter(totalAnalyses, counterDisplay);

        renderJobCards(reports, resultsContainer);
        renderStudyRecommendation(recommendation, recommendationContainer);
    });
}