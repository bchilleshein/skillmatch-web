import { TechJob } from './motor.js';

export async function fetchJobs(statusContainerEl) {
    try {
        if (statusContainerEl) {
            statusContainerEl.innerHTML = `<p class="state-loading">Carregando as vagas disponíveis...</p>`;
        }

        const response = await fetch('./assets/data/vagas.json');

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const rawData = await response.json();

        if (!rawData || rawData.length === 0) {
            if (statusContainerEl) {
                statusContainerEl.innerHTML = `<p class="state-empty">Nenhuma vaga encontrada.</p>`;
            }
            return [];
        }

        if (statusContainerEl) {
            statusContainerEl.innerHTML = '';
        }

        return rawData.map(item => new TechJob(item));

    } catch (error) {
        console.error("Falha ao recuperar vagas:", error);
        if (statusContainerEl) {
            statusContainerEl.innerHTML = `<p class="state-error">Erro ao carregar as vagas. Verifique a sua ligação à rede ou o servidor local.</p>`;
        }
        return [];
    }
}

const storage_key = 'skillmatch_candidate_profile_v1';

export function savePerfilLocalStorage(profileObj) {
    try {
        const dataString = JSON.stringify(profileObj);
        localStorage.setItem(storage_key, dataString);
    } catch (error) {
        console.error("Erro ao guardar dados no localStorage:", error);
    }
}

export function loadPerfilLocalStorage() {
    try {
        const dataString = localStorage.getItem(storage_key);
        if (!dataString) {
            return null;
        }
        return JSON.parse(dataString);
    } catch (error) {
        console.error("Erro ao ler dados do localStorage:", error);
        return null;
    }
}