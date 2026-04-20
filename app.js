/**
 * Ingre Net - Professional Food Ingredient Database SPA
 * Created by BST Students, University of Vocational Technology
 */

const state = {
    currentRoute: 'home',
    searchQuery: '',
    selectedCategory: 'all'
};

const appContent = document.getElementById('appContent');
const fallbackIngredientImage = DEFAULT_INGREDIENT_IMAGE;

// --- ROUTER ---
function init() {
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            header.classList.add('glass-header');
        } else {
            header.classList.remove('glass-header');
        }
    });
    handleRoute();
}

function handleRoute() {
    let hash = window.location.hash.substring(1);
    const routes = {
        'home': renderHome,
        'about': renderAbout,
        'database': renderDatabase,
        'calculators': renderCalculators,
        'resources': renderResources,
        'disclaimer': renderDisclaimer
    };

    if (!hash || !routes[hash]) {
        hash = 'home';
        window.location.hash = hash;
        return;
    }
    
    state.currentRoute = hash;
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
        }
    });
    
    // Render route content
    window.scrollTo(0,0);
    routes[hash]();
}

// --- VIEW RENDERS ---

function renderHome() {
    appContent.innerHTML = `
        <section class="hero animate-fade-in" style="background: linear-gradient(rgba(13, 110, 253, 0.4), rgba(25, 135, 84, 0.4)), url('https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: multiply;">
            <div class="container hero-content">
                <h1 style="font-size: 3.5rem; line-height: 1.1; margin-bottom: 25px; font-weight: 800; text-shadow: 0 4px 10px rgba(0,0,0,0.3);">For Food Scientists and Product Developers</h1>
                <p style="font-size: 1.4rem; opacity: 0.95; margin-bottom: 40px; line-height: 1.6; max-width: 800px; text-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                    Your centralized, data-driven hub for food additive regulations, maximum permitted limits, and global safety standards.
                </p>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <a href="#database" class="btn btn-primary btn-lg" style="padding: 18px 35px; border-radius: 50px; font-weight: 600;">Explore Database</a>
                    <a href="#calculators" class="btn btn-secondary btn-lg" style="padding: 18px 35px; border-radius: 50px; font-weight: 600; background: white; color: var(--primary-blue)">Batch Calculator</a>
                </div>
            </div>
        </section>

        <section class="section-padding animate-fade-in" style="background: white;">
            <div class="container" style="max-width: 900px; text-align: center;">
                <h2 style="color: var(--primary-blue); margin-bottom: 30px; font-size: 2.2rem;">Scientific Precision in Formulation</h2>
                <p style="font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); font-weight: 400;">
                    Formulating safe, compliant, and high-quality food products requires exact science. <strong>Ingre Net</strong> provides instant access to meticulously compiled regulatory data—bridging the gap between international compliance standards and the production floor.
                </p>
            </div>
        </section>

        <section class="section-padding bg-light" id="categories">
            <div class="container">
                <div class="section-title text-center" style="margin-bottom: 60px;">
                    <h2 style="font-size: 2.8rem; color: var(--primary-blue); font-weight: 800;">Ingredient Categories</h2>
                    <p style="margin-top: 15px; color: var(--text-muted); font-size: 1.1rem;">Instant access to regulatory profiles for all major functional classes.</p>
                </div>
                <div class="categories-grid">
                    <!-- Preservatives -->
                    <div class="glass-card category-card" onclick="window.location.hash='database'; state.selectedCategory='Preservative';">
                        <div class="category-img">
                            <img src="images/categories/preservatives.jpg" alt="Preservatives">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));"></div>
                        </div>
                        <div class="category-content">
                            <h3 style="color: #dc3545;">Preservatives</h3>
                            <p>Antimicrobials and antifungals (like Sorbates and Benzoates) that inhibit spoilage and extend shelf life.</p>
                        </div>
                    </div>
                    
                    <!-- Emulsifiers -->
                    <div class="glass-card category-card" onclick="window.location.hash='database'; state.selectedCategory='Emulsifier';">
                        <div class="category-img">
                            <img src="images/categories/emulsifiers.jpg" alt="Emulsifiers">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));"></div>
                        </div>
                        <div class="category-content">
                            <h3 style="color: #fd7e14;">Emulsifiers</h3>
                            <p>Agents (like Lecithin and Polysorbates) that stabilize mixtures of immiscible liquids to create perfect textures.</p>
                        </div>
                    </div>
                    
                    <!-- Antioxidants -->
                    <div class="glass-card category-card" onclick="window.location.hash='database'; state.selectedCategory='Antioxidant';">
                        <div class="category-img">
                            <img src="images/categories/antioxidant.jpg" alt="Antioxidants">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));"></div>
                        </div>
                        <div class="category-content">
                            <h3 style="color: #198754;">Antioxidants</h3>
                            <p>Compounds (like Tocopherols and BHA) that prevent oxidative rancidity and color degradation in fats and oils.</p>
                        </div>
                    </div>
                    
                    <!-- Colours -->
                    <div class="glass-card category-card" onclick="window.location.hash='database'; state.selectedCategory='Colour';">
                        <div class="category-img">
                            <img src="images/categories/colours.jpg" alt="Colours">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));"></div>
                        </div>
                        <div class="category-content">
                            <h3 style="color: #6f42c1;">Colours</h3>
                            <p>Natural and synthetic dyes used to restore, enhance, or add vibrant visual appeal to food and beverages.</p>
                        </div>
                    </div>
                    
                    <!-- Stabilizers -->
                    <div class="glass-card category-card" onclick="window.location.hash='database'; state.selectedCategory='Stabilizer';">
                        <div class="category-img">
                            <img src="images/categories/Stabilizers.jpg" alt="Stabilizers">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));"></div>
                        </div>
                        <div class="category-content">
                            <h3 style="color: var(--primary-blue);">Stabilizers</h3>
                            <p>Hydrocolloids (like Pectin and Xanthan Gum) that provide structural integrity, viscosity, and perfect mouthfeel.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderAbout() {
    appContent.innerHTML = `
        <section class="database-header animate-fade-in" style="background: linear-gradient(135deg, rgba(13, 110, 253, 0.8), rgba(25, 135, 84, 0.8)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: multiply;">
            <div class="container">
                <h1 style="color: white; font-size: 3.5rem; font-weight: 800;">About Ingre Net</h1>
            </div>
        </section>
        
        <section class="section-padding animate-fade-in">
            <div class="container" style="max-width: 1100px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 60px; align-items: center; margin-bottom: 80px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                             <div style="width: 50px; height: 5px; background: var(--bio-green); border-radius: 5px;"></div>
                             <h4 style="text-transform: uppercase; color: var(--bio-green); letter-spacing: 2px; font-weight: 700;">Ingredient Insights</h4>
                        </div>
                        <h2 style="color: var(--primary-blue); margin-bottom: 25px; font-size: 2.5rem; font-weight: 800;">Our Vision</h2>
                        <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 40px; border-left: 4px solid #eee; padding-left: 25px;">
                            To be the premier digital standard for food safety, formulation compliance, and bio-system education in Sri Lanka and across the globe.
                        </p>
                        
                        <h2 style="color: var(--primary-blue); margin-bottom: 25px; font-size: 2.5rem; font-weight: 800;">Our Mission</h2>
                        <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted); border-left: 4px solid var(--bio-green); padding-left: 25px;">
                            To bridge the gap between complex regulatory data and practical food manufacturing through accessible, accurate, and user-friendly technological tools.
                        </p>
                    </div>
                    <div style="position: relative;">
                         <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" alt="BEd Students" style="width: 100%; border-radius: 20px; box-shadow: var(--shadow-lg);">
                         <div class="glass-card" style="position: absolute; bottom: -30px; right: -30px; padding: 30px; max-width: 250px; background: rgba(255,255,255,0.95); border-left: 5px solid var(--bio-green);">
                             <h5 style="color: var(--primary-blue); font-size: 1.1rem; margin-bottom: 10px;">The Team</h5>
                             <p style="font-size: 0.85rem; color: var(--text-muted);">Bachelor of Education in Bio system Technology Students.</p>
                         </div>
                    </div>
                </div>
                
                <div class="glass-card" style="padding: 60px; border-top: 8px solid var(--primary-blue); background: linear-gradient(to right, #ffffff, #f8faff);">
                    <div style="text-align: center; margin-bottom: 40px;">
                         <i class="fas fa-university" style="font-size: 4rem; color: #cbd5e0; margin-bottom: 20px;"></i>
                         <h2 style="color: var(--primary-blue); font-size: 2.2rem; font-weight: 800;">Academic Excellence</h2>
                    </div>
                    <p style="font-size: 1.3rem; line-height: 2; color: var(--text-dark); text-align: center; max-width: 800px; margin: 0 auto;">
                        <strong>Ingre Net</strong> is proudly conceptualized, researched, and created by the 
                        <span style="color: var(--bio-green); font-weight: 700;">Bachelor of Education in Bio System Technology Students</span> 
                        at the <strong>University of Vocational Technology</strong>. 
                        By combining our rigorous academic training in bio-systems with modern web technology, we aim to empower the next generation of food scientists and production executives.
                    </p>
                </div>
            </div>
        </section>
    `;
}

function renderDatabase() {
    document.body.classList.remove('modal-open');
    appContent.innerHTML = `
        <section class="database-header animate-fade-in" style="background: linear-gradient(135deg, rgba(13, 110, 253, 0.9), rgba(25, 135, 84, 0.9)), url('https://images.unsplash.com/photo-1532187875605-1ef6c237f1f6?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: overlay;">
            <div class="container">
                <h1 style="color: white; font-size: 3.5rem; font-weight: 800;">The Master Additive Database</h1>
                <p style="max-width: 800px; margin: 20px auto 0; font-size: 1.2rem; line-height: 1.6; color: rgba(255,255,255,0.95); font-weight: 500;">
                    Search, filter, and cross-reference our complete database of over 85+ critical food additives. All data is strictly sourced from CLI, FDA CFR, EU Regulations, and Sri Lanka Food Acts.
                </p>
            </div>
        </section>
        
        <section class="animate-fade-in section-padding" style="background: var(--bg-light);">
            <div class="container">
                <div class="glass-card" style="padding: 30px; margin-bottom: 40px; background: white;">
                    <div class="controls-container" style="margin: 0; display: flex; gap: 20px;">
                        <div style="flex: 2; position: relative;">
                            <i class="fas fa-search" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                            <input type="text" id="searchInput" class="search-input" style="padding-left: 50px; width: 100%; height: 54px; border: 1px solid #ddd; border-radius: 12px;" placeholder="Search by name, INS number, or function..." value="${state.searchQuery}">
                        </div>
                        <select id="categoryFilter" class="filter-select" style="height: 54px; padding: 0 20px; border: 1px solid #ddd; border-radius: 12px; background: white; font-weight: 600;">
                            <option value="all">All Functional Classes</option>
                            <option value="Preservative">Preservatives</option>
                            <option value="Colour">Colours</option>
                            <option value="Emulsifier">Emulsifiers</option>
                            <option value="Antioxidant">Antioxidants</option>
                            <option value="Stabilizer">Stabilizers</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Ingredient Name</th>
                                <th>INS / E-Number</th>
                                <th>Function</th>
                                <th style="min-width: 250px;">Permitted Categories</th>
                                <th style="min-width: 200px;">MPL Details</th>
                                <th>Image</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody id="databaseTableBody">
                            <!-- Populated by JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <div id="ingredientImageModal" class="ingredient-modal" aria-hidden="true">
            <div class="ingredient-modal__backdrop" data-close-modal></div>
            <div class="ingredient-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ingredientImageTitle">
                <button type="button" class="ingredient-modal__close" aria-label="Close image preview" data-close-modal>&times;</button>
                <h3 id="ingredientImageTitle" class="ingredient-modal__title">Ingredient Image</h3>
                <img id="ingredientImagePreview" class="ingredient-modal__image" src="${fallbackIngredientImage}" alt="Ingredient preview">
            </div>
        </div>
    `;
    
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        updateTable();
    });
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        updateTable();
    });

    const modal = document.getElementById('ingredientImageModal');
    modal.querySelectorAll('[data-close-modal]').forEach((element) => {
        element.addEventListener('click', closeIngredientImage);
    });
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeIngredientImage();
        }
    });

    document.removeEventListener('keydown', handleIngredientModalKeydown);
    document.addEventListener('keydown', handleIngredientModalKeydown);
    
    updateTable();
}

function renderCalculators() {
    const additiveOptions = ingredientsData.map(item => 
        `<option value="${item.ins}" data-mpl="${item.rawMpl}" data-unit="${item.unit}" data-name="${item.name}">${item.name} (${item.ins})</option>`
    ).join('');

    appContent.innerHTML = `
        <section class="database-header animate-fade-in" style="background: linear-gradient(135deg, #0d6efd, #0dcaf0), url('https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: multiply;">
            <div class="container">
                <h1 style="color: white">Batch Dosage Calculator</h1>
                <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-top: 15px;">
                    Eliminate manual conversion errors on the production floor. Select your additive and input your total batch size.
                </p>
            </div>
        </section>
        
        <section class="section-padding animate-fade-in" style="background: var(--bg-light); min-height: 60vh;">
            <div class="container">
                <div class="calculator-container">
                    <h2 class="text-center" style="margin-bottom: 40px; color: var(--primary-blue);">Production Dosage Tool</h2>
                    
                    <form id="calcForm">
                        <div class="form-group">
                            <label class="form-label">Select Ingredient</label>
                            <select class="form-control" id="additiveSelect" required>
                                <option value="" disabled selected>Choose an ingredient...</option>
                                ${additiveOptions}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Total Batch Weight (kg)</label>
                            <input type="number" class="form-control" id="batchSize" placeholder="e.g. 1000" step="0.1" required>
                        </div>
                        
                        <div class="form-group" style="display: none;" id="customMplGroup">
                            <label class="form-label">Target MPL (mg/kg or ppm)</label>
                            <input type="number" class="form-control" id="customMpl" placeholder="Enter limit e.g. 100">
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 15px; font-size: 1.1rem;">
                            Calculate Legal Dosage
                        </button>
                    </form>
                    
                    <div class="calc-result" id="calcResult">
                        <h4 style="color: var(--primary-blue); text-transform: uppercase;">Maximum Legal Dosage</h4>
                        <div style="font-size: 3.5rem; font-weight: 800; color: var(--bio-green); margin: 20px 0;" id="resAmount">0 g</div>
                        <p id="resAdditive" style="font-weight: 600; font-size: 1.1rem;"></p>
                        <div id="resNote" style="margin-top: 20px; font-size: 0.9rem; color: var(--text-muted); font-style: italic;"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    setupCalculatorLogic();
}

function setupCalculatorLogic() {
    const calcForm = document.getElementById('calcForm');
    const additiveSelect = document.getElementById('additiveSelect');
    const batchSizeInput = document.getElementById('batchSize');
    const customMplGroup = document.getElementById('customMplGroup');
    const customMplInput = document.getElementById('customMpl');
    const resultDiv = document.getElementById('calcResult');
    
    if(!calcForm) return;

    additiveSelect.addEventListener('change', () => {
        const option = additiveSelect.options[additiveSelect.selectedIndex];
        const rawMpl = option.getAttribute('data-mpl');
        
        if (rawMpl === 'GMP') {
            customMplGroup.style.display = 'block';
            customMplInput.required = true;
        } else {
            customMplGroup.style.display = 'none';
            customMplInput.required = false;
        }
    });
    
    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const option = additiveSelect.options[additiveSelect.selectedIndex];
        const name = option.getAttribute('data-name');
        const unitStr = option.getAttribute('data-unit');
        let rawMpl = option.getAttribute('data-mpl');
        const batchSize = parseFloat(batchSizeInput.value);
        
        let targetMplNum = 0;
        let unit = unitStr;

        if (rawMpl === 'GMP') {
            targetMplNum = parseFloat(customMplInput.value);
            unit = 'mg/kg'; 
        } else {
            targetMplNum = parseFloat(rawMpl);
        }
        
        if (isNaN(targetMplNum) || isNaN(batchSize)) return;

        let dosageGrams = 0;
        if (unit && unit.includes('%')) {
            dosageGrams = (targetMplNum / 100) * batchSize * 1000;
        } else {
            dosageGrams = (targetMplNum * batchSize) / 1000;
        }
        
        document.getElementById('resAdditive').innerText = name;
        document.getElementById('resAmount').innerText = dosageGrams >= 1000 ? (dosageGrams/1000).toFixed(2) + ' kg' : dosageGrams.toFixed(2) + ' g';
        document.getElementById('resNote').innerText = `Based on a batch size of ${batchSize}kg and a limit of ${targetMplNum}${unit}. Always verify with local QA.`;
        
        resultDiv.style.display = 'block';
        resultDiv.classList.add('active');
    });
}

function renderResources() {
    appContent.innerHTML = `
        <section class="database-header animate-fade-in" style="background: linear-gradient(135deg, #130f40, #30336b), url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: overlay;">
            <div class="container">
                <h1 style="color: white">Global Standards & Nutrition</h1>
                <p style="max-width: 800px; margin: 20px auto 0; font-size: 1.15rem; color: rgba(255,255,255,0.9); line-height: 1.6;">
                    Grounded in the world's most trusted authorities.
                </p>
            </div>
        </section>
        
        <section class="section-padding animate-fade-in">
            <div class="container">
                <div class="resources-grid">
                    <div class="glass-card resource-card">
                        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" class="resource-img" alt="FAO">
                        <div class="resource-content">
                            <h3>FAO Global Info</h3>
                            <p style="color: var(--text-muted); margin-bottom: 20px;">Food and Agriculture Organization of the United Nations. Global standards for agricultural food safety.</p>
                            <a href="https://www.fao.org/about/about-fao/en/" target="_blank" class="btn btn-primary" style="display: block; text-align: center;">Visit FAO Portal</a>
                        </div>
                    </div>
                    
                    <div class="glass-card resource-card">
                        <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800" class="resource-img" alt="EatRight">
                        <div class="resource-content">
                            <h3>EatRight Nutrition</h3>
                            <p style="color: var(--text-muted); margin-bottom: 20px;">Academy of Nutrition and Dietetics. Trusted guidance for health and dietary safety.</p>
                            <a href="https://www.eatright.org/" target="_blank" class="btn btn-primary" style="display: block; text-align: center; background: var(--bio-green); border-color: var(--bio-green);">Visit EatRight Portal</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderDisclaimer() {
    appContent.innerHTML = `
        <section class="database-header animate-fade-in" style="background: linear-gradient(135deg, #000, #2c3e50), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000') center/cover; background-blend-mode: multiply;">
            <div class="container">
                <h1 style="color: white; font-size: 3rem; font-weight: 800;">Legal Disclaimer</h1>
            </div>
        </section>
        
        <section class="section-padding animate-fade-in" style="background: white;">
            <div class="container" style="max-width: 900px;">
                <div class="glass-card" style="padding: 40px; border-left: 8px solid #dc3545; margin-bottom: 40px; background: #fffcfc;">
                    <h2 style="color: #dc3545; margin-bottom: 20px;">DISCLAIMER</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8;">
                        The data provided on <strong>Ingre Net</strong> is for educational and informational purposes only. While our team of Bio System Technology students strives for absolute accuracy, regulatory limits (MPLs) are subject to continuous change by international and local authorities (Codex, FDA, EU, SL Food Act). This tool should be used as a primary reference, but all dosages and formulations must be independently verified by your facility's Quality Assurance department prior to commercial production.
                    </p>
                </div>
                
                <div class="glass-card" style="padding: 40px; border-left: 8px solid var(--primary-blue);">
                    <h2 style="color: var(--primary-blue); margin-bottom: 25px;">Data & References</h2>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="color: var(--bio-green);"></i> 
                            Codex General Standard for Food Additives (GSFA)
                        </li>
                        <li style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="color: var(--bio-green);"></i> 
                            FDA Code of Federal Regulations (Title 21)
                        </li>
                        <li style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="color: var(--bio-green);"></i> 
                            EU Regulation (EC) No 1333/2008
                        </li>
                        <li style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="color: var(--bio-green);"></i> 
                            Sri Lanka Food (Preservatives and Additives) Regulations
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    `;
}

// --- TABLE LOGIC ---

function getBadgeClass(catStr) {
    catStr = catStr.toLowerCase();
    if(catStr.includes('preservative')) return 'badge-red';
    if(catStr.includes('colour')) return 'badge-purple';
    if(catStr.includes('emulsifier')) return 'badge-orange';
    if(catStr.includes('antioxidant')) return 'badge-green';
    if(catStr.includes('stabilizer') || catStr.includes('thickener')) return 'badge-blue';
    return 'badge-blue';
}

function updateTable() {
    const tbody = document.getElementById('databaseTableBody');
    if (!tbody) return;
    
    const query = state.searchQuery.toLowerCase();
    
    const filtered = ingredientsData.filter(item => {
        let categoryMatch = state.selectedCategory === 'all' || 
                        item.functionalClass.toLowerCase().includes(state.selectedCategory.toLowerCase());
        
        const textMatch = item.name.toLowerCase().includes(query) || 
                          item.ins.toLowerCase().includes(query) || 
                          item.functionalClass.toLowerCase().includes(query);
                          
        return categoryMatch && textMatch;
    });
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="padding: 60px; color: var(--text-muted);">No additives found matching your search.</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map(item => {
        const badgeClass = getBadgeClass(item.functionalClass);
        const functionalShort = item.functionalClass.split(/[,.]/)[0].replace(/\d+/, '').trim();
        const imageSrc = typeof item.image === 'string' && item.image.trim()
            ? item.image.trim()
            : fallbackIngredientImage;
        
        return `
            <tr>
                <td style="font-weight: 700; color: var(--text-dark);">${item.name}</td>
                <td style="color: var(--primary-blue); font-weight: 800;">${item.ins}</td>
                <td><span class="badge ${badgeClass}">${functionalShort}</span></td>
                <td style="font-size: 0.85rem; max-width: 300px;">${item.permittedCategories}</td>
                <td style="font-size: 0.9rem;">
                    <strong>${item.mplDetails}</strong><br>
                    <small style="color: #888;">Unit: ${item.unit}</small>
                </td>
                <td>
                    <button type="button" class="image-button" onclick='openIngredientImage(${JSON.stringify(imageSrc)}, ${JSON.stringify(item.name)})'>View Image</button>
                </td>
                <td style="font-size: 0.8rem; color: #666;">${item.lastUpdated}</td>
            </tr>
        `;
    }).join('');
}

function openIngredientImage(imageSrc, ingredientName) {
    const modal = document.getElementById('ingredientImageModal');
    const image = document.getElementById('ingredientImagePreview');
    const title = document.getElementById('ingredientImageTitle');

    if (!modal || !image || !title) return;

    image.src = imageSrc || fallbackIngredientImage;
    image.alt = ingredientName ? `${ingredientName} image` : 'Ingredient preview';
    title.textContent = ingredientName || 'Ingredient Image';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeIngredientImage() {
    const modal = document.getElementById('ingredientImageModal');
    document.body.classList.remove('modal-open');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function handleIngredientModalKeydown(event) {
    if (event.key === 'Escape') {
        closeIngredientImage();
    }
}

// Mobile Menu Toggle
document.addEventListener('click', (e) => {
    if (e.target.closest('#menu-btn')) {
        document.getElementById('nav-links').classList.toggle('show');
    } else if (e.target.closest('.nav-links a')) {
        document.getElementById('nav-links').classList.remove('show');
    }
});

// Start app
document.addEventListener('DOMContentLoaded', init);
