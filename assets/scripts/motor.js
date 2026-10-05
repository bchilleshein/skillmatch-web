export const studyRecommendationsLinks = {
    "JavaScript ES6": "https://www.freecodecamp.org/learn/javascript-v9/",
    "HTML5": "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
    "CSS3": "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
    "React": "https://react.dev/learn",
    "TypeScript": "https://www.typescriptlang.org/docs/",
    "CSS Responsive (Flexbox/Grid)": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    "Consumo de APIs REST (Fetch/Async-Await)": "https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch",
    "Tailwind CSS": "https://tailwindcss.com/docs",
    "Testes Unitários (Jest)": "https://jestjs.io/docs/getting-started"
};

export class Job {
    constructor(jobData) {
        this.id = jobData.id;
        this.company = jobData.company;
        this.position = jobData.position;
        this.seniority = jobData.seniority || "";
        this.salary = jobData.salary || "A combinar";
        this.location = jobData.location || "Não especificado";
        this.requirements = jobData.requirements || [];
    }

    getDetails() {
        return `${this.position} na ${this.company} (${this.seniority}) - ${this.salary}`;
    }

    missingSkills(candidateSkills) {
        const candNorm = candidateSkills.map(s => s.trim().toLowerCase());
        return this.requirements.filter(req => {
            const reqNorm = req.trim().toLowerCase();
            const found = candNorm.some(cand => 
                reqNorm.includes(cand) || cand.includes(reqNorm)
            );
            return !found;
        });
    }
}

export class TechJob extends Job {
    constructor(jobData) {
        super(jobData);
        this.modality = jobData.modality || "Remoto";
    }

    getDetails() {
        return `${super.getDetails()} [Modalidade: ${this.modality} | Local: ${this.location}]`;
    }

    calculateMatch(candidateSkills) {
        const missing = this.missingSkills(candidateSkills);
        const totalReqs = this.requirements.length;
        const found = this.requirements.filter(req => !missing.includes(req));
        const percentage = totalReqs > 0 ? Math.round((found.length / totalReqs) * 100) : 0;

        let classification = "Baixa";
        let matchClass = "low-match";
        if (percentage >= 80) {
            classification = "Alta";
            matchClass = "high-match";
        } else if (percentage >= 50) {
            classification = "Média";
            matchClass = "medium-match";
        }

        return {
            percentage,
            classification,
            matchClass,
            found,
            missing
        };
    }
}

export class Candidate {
    constructor(name, area, skills, experience) {
        this.name = name;
        this.area = area;
        this.skills = skills;
        this.experience = parseFloat(experience) || 0;
    }
}

export class MatchAnalyzer {
    constructor(jobs, candidate) {
        this.jobs = jobs;
        this.candidate = candidate;
    }

    processReports() {
        return this.jobs.map(jobData => {
            const job = jobData instanceof Job ? jobData : new TechJob(jobData);
            const result = job.calculateMatch(this.candidate.skills);

            return {
                job: job,
                percentage: result.percentage,
                classification: result.classification,
                matchClass: result.matchClass,
                found: result.found,
                missing: result.missing
            };
        });
    }

    getBestRecommendation(reports) {
        const allMissing = reports.flatMap(report => report.missing || []);

        if (allMissing.length === 0) {
            return "Parabéns! O seu perfil cobre 100% dos requisitos para as vagas analisadas.";
        }

        const frequencyMap = {};
        allMissing.forEach((skill) => {
            frequencyMap[skill] = (frequencyMap[skill] || 0) + 1;
        });

        let maxCount = 0;
        let topSkills = [];
        for (const skill in frequencyMap) {
            if (frequencyMap[skill] > maxCount) {
                maxCount = frequencyMap[skill];
                topSkills = [skill];
            } else if (frequencyMap[skill] === maxCount) {
                topSkills.push(skill);
            }
        }

        let prioritySkill = topSkills.includes("JavaScript ES6") ? "JavaScript ES6" : topSkills[0];
        const link = studyRecommendationsLinks[prioritySkill] || "Consulte a documentação oficial.";
        
        return `Para se destacar, sugere-se focar no estudo de <strong>${prioritySkill}</strong> (<a href="${link}" target="_blank" rel="noopener noreferrer">Material de Apoio</a>).`;
    }
}

export function createJobCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

export function executeWithCallback(statusMessage, callback) {
    console.log(statusMessage);
    if (typeof callback === 'function') {
        callback();
    }
}