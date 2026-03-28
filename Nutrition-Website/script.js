class App {
    constructor() {
        this.currentView = 'home';
        this.contentContainer = document.getElementById('app-content');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '') || 'home';
            this.navigate(hash);
        });
        
        const initialHash = window.location.hash.replace('#', '') || 'home';
        this.navigate(initialHash);
    }

    toggleMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
    }

    navigate(viewName) {
        this.currentView = viewName;
        window.location.hash = viewName;
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${viewName}`) {
                link.classList.add('active');
            }
        });

        document.querySelector('.nav-links').classList.remove('active');
        this.render();
    }

    render() {
        const views = {
            'home': this.HomeView.bind(this),
            'about': this.AboutView.bind(this),
            'database': this.DatabaseView.bind(this),
            'calculator': this.CalculatorView.bind(this),
            'resources': this.ResourcesView.bind(this),
            'disclaimer': this.DisclaimerView.bind(this)
        };

        const viewHTML = (views[this.currentView] || this.HomeView)();
        this.contentContainer.innerHTML = `<div class="view-section active">${viewHTML}</div>`;
        
        // After rendering, if it's the database, render the table
        if(this.currentView === 'database') {
            this.renderTable(ingredientData);
        }
        
        if(this.currentView === 'calculator') {
            this.initCalculator();
        }
        
        window.scrollTo(0, 0);
    }

    HomeView() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1>For Food Scientists and Product Developers</h1>
                    <p>Your centralized, data-driven hub for food additive regulations, maximum permitted limits, and global safety standards.</p>
                    <button class="btn btn-green" onclick="app.navigate('database')">Explore Database</button>
                    <button class="btn btn-primary" style="margin-left: 10px;" onclick="app.navigate('calculator')">Batch Calculator</button>
                </div>
            </section>
            <section class="section-container">
                <h2 class="section-title">Ingredient Categories</h2>
                <p class="section-subtitle">Formulating safe, compliant, and high-quality food products requires exact science. Ingre Net provides instant access to meticulously compiled regulatory data—bridging the gap between international compliance standards and the production floor.</p>
                
                <div class="category-grid">
                    <div class="category-card" onclick="app.navigate('database'); setTimeout(() => {document.getElementById('cat-filter').value='Preservatives'; app.filterTable();}, 100)">
                        <div class="category-img" style="background-image: url('https://images.unsplash.com/photo-1596489392276-80f0891d4e0e?auto=format&fit=crop&q=80')"></div>
                        <div class="category-content">
                            <h3>Preservatives</h3>
                            <p>Antimicrobials and antifungals (like Sorbates and Benzoates) that inhibit spoilage and extend shelf life.</p>
                        </div>
                    </div>
                    
                    <div class="category-card" onclick="app.navigate('database'); setTimeout(() => {document.getElementById('cat-filter').value='Emulsifiers'; app.filterTable();}, 100)">
                        <div class="category-img" style="background-image: url('https://images.unsplash.com/photo-1618142721021-395d85265fa3?auto=format&fit=crop&q=80')"></div>
                        <div class="category-content">
                            <h3>Emulsifiers</h3>
                            <p>Agents (like Lecithin and Polysorbates) that stabilize mixtures of immiscible liquids to create perfect textures.</p>
                        </div>
                    </div>
                    
                    <div class="category-card" onclick="app.navigate('database'); setTimeout(() => {document.getElementById('cat-filter').value='Antioxidants'; app.filterTable();}, 100)">
                        <div class="category-img" style="background-image: url('https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80')"></div>
                        <div class="category-content">
                            <h3>Antioxidants</h3>
                            <p>Compounds (like Tocopherols and BHA) that prevent oxidative rancidity and color degradation in fats and oils.</p>
                        </div>
                    </div>
                    
                    <div class="category-card" onclick="app.navigate('database'); setTimeout(() => {document.getElementById('cat-filter').value='Colours'; app.filterTable();}, 100)">
                        <div class="category-img" style="background-image: url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80')"></div>
                        <div class="category-content">
                            <h3 style="color: var(--accent-orange);">Colours</h3>
                            <p>Natural and synthetic dyes used to restore, enhance, or add vibrant visual appeal to food.</p>
                        </div>
                    </div>
                    
                    <div class="category-card" onclick="app.navigate('database'); setTimeout(() => {document.getElementById('cat-filter').value='Stabilizers'; app.filterTable();}, 100)">
                        <div class="category-img" style="background-image: url('https://images.unsplash.com/photo-1550534781-a75dcb009477?auto=format&fit=crop&q=80')"></div>
                        <div class="category-content">
                            <h3 style="color: var(--accent-purple);">Stabilizers</h3>
                            <p>Hydrocolloids (like Pectin and Xanthan Gum) that provide structural integrity, viscosity, and perfect mouthfeel.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    AboutView() {
        return `
            <section class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1532050228392-4217112000ea?auto=format&fit=crop&q=80'); height: 40vh;">
                <div class="hero-content">
                    <h1>About Us</h1>
                </div>
            </section>
            <section class="section-container">
                <div style="max-width: 800px; margin: 0 auto; text-align: left;">
                    <h2 class="section-title">Ingredient Insights</h2>
                    
                    <div style="margin-top: 2rem;">
                        <h3 style="color: var(--safety-blue); margin-bottom: 1rem;"><i class="fa-solid fa-eye"></i> Our Vision</h3>
                        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #555;">To be the premier digital standard for food safety, formulation compliance, and bio-system education in Sri Lanka and across the globe.</p>
                        
                        <h3 style="color: var(--safety-blue); margin-bottom: 1rem;"><i class="fa-solid fa-bullseye"></i> Our Mission</h3>
                        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #555;">To bridge the gap between complex regulatory data and practical food manufacturing through accessible, accurate, and user-friendly technological tools.</p>
                        
                        <h3 style="color: var(--safety-blue); margin-bottom: 1rem;"><i class="fa-solid fa-users"></i> The Team</h3>
                        <p style="font-size: 1.1rem; color: #555;">Ingre Net is proudly conceptualized, researched, and created by the <strong>Bachelor of Education in Bio System Technology Students at the University of Vocational Technology</strong>. By combining our rigorous academic training in bio-systems with modern web technology, we aim to empower the next generation of food scientists and production executives.</p>
                    </div>
                </div>
            </section>
        `;
    }

    DatabaseView() {
        return `
            <section class="hero" style="background-image: linear-gradient(rgba(0,90,156,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1628588506821-ba31776ce3cc?auto=format&fit=crop&q=80'); height: 40vh;">
                <div class="hero-content">
                    <h1>The Master Additive Database</h1>
                    <p>Search, filter, and cross-reference our complete database of critical food additives.</p>
                </div>
            </section>
            <section class="section-container" style="max-width: 1400px;">
                <div class="controls">
                    <input type="text" id="search-input" class="search-bar" placeholder="Search by name, INS/E-number, or function..." onkeyup="app.filterTable()">
                    <select id="cat-filter" class="filter-select" onchange="app.filterTable()">
                        <option value="All">All Categories</option>
                        <option value="Preservatives">Preservatives</option>
                        <option value="Colours">Colours</option>
                        <option value="Emulsifiers">Emulsifiers</option>
                        <option value="Antioxidants">Antioxidants</option>
                        <option value="Stabilizers">Stabilizers</option>
                    </select>
                </div>
                <div class="table-wrapper">
                    <table id="data-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Name</th>
                                <th>INS/E-No.</th>
                                <th>Functional Class</th>
                                <th>Permitted Categories</th>
                                <th>MPL</th>
                                <th>Unit</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <!-- Injected rows -->
                        </tbody>
                    </table>
                </div>
            </section>
        `;
    }

    filterTable() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const category = document.getElementById('cat-filter').value;
        
        const filteredData = ingredientData.filter(item => {
            const matchesQuery = Object.values(item).some(val => 
                String(val).toLowerCase().includes(query)
            );
            const matchesCat = category === "All" || item.category === category;
            return matchesQuery && matchesCat;
        });
        
        this.renderTable(filteredData);
    }

    renderTable(data) {
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 2rem;">No matching ingredients found.</td></tr>';
            return;
        }
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            
            // Generate vibrant colors for different categories dynamically
            let pillColor = "#2ecc71";
            let pillBg = "#eafaf1";
            if(item.category === "Preservatives") { pillColor = "#0077c2"; pillBg = "#e6f4ff"; }
            if(item.category === "Colours") { pillColor = "#f39c12"; pillBg = "#fef5e7"; }
            if(item.category === "Stabilizers") { pillColor = "#9b59b6"; pillBg = "#f5eef8"; }
            if(item.category === "Emulsifiers") { pillColor = "#e74c3c"; pillBg = "#fdedec"; }

            tr.innerHTML = \`
                <td><span style="background: \${pillBg}; color: \${pillColor}; padding: 0.4rem 0.8rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">\${item.category}</span></td>
                <td style="font-weight: 700; font-family: var(--font-heading); font-size: 1.05rem; color: var(--dark-text);">\${item.name}</td>
                <td><span style="background: #f1f2f6; color: #636e72; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 600; font-family: monospace;">\${item.ins}</span></td>
                <td style="color: #555;">\${item.function.replace(/\\n/g, '<br>')}</td>
                <td style="color: #555;">\${item.permittedCategories.replace(/\\n/g, '<br>')}</td>
                <td style="font-weight: 600; color: \${pillColor};">\${item.mpl.replace(/\\n/g, '<br>')}</td>
                <td style="font-weight: 600;">\${item.unit}</td>
                <td><small style="color: #666; line-height: 1.4; display: block;">\${item.notes}</small></td>
            \`;
            tbody.appendChild(tr);
        });
    }

    CalculatorView() {
        // Calculate dynamic options
        // We will include only those with quantitative mg/kg, mg/L, or % limits where possible.
        // As a fallback, we include all additives so the user can see them, but some might not have fixed numbers.
        let optionsHtml = '<option value="">-- Choose Target Additive --</option>';
        ingredientData.forEach(item => {
            // Try to extract a number from MPL
            let mplMatch = String(item.mpl).match(/([0-9.]+)/);
            let mplVal = mplMatch ? mplMatch[1] : null;
            let unit = item.unit.includes('%') ? '%' : (item.unit.includes('mg/L') ? 'mg/L' : 'mg/kg');
            
            if (mplVal) {
                optionsHtml += \`<option value="\${mplVal}" data-unit="\${unit}">\${item.name} (\${item.category}) - Limit: \${mplVal} \${unit}</option>\`;
            } else {
                // For GMP, we can't really calculate a strict dosage
                optionsHtml += \`<option value="GMP" data-unit="GMP" disabled>\${item.name} (\${item.category}) - Limit: GMP (Quantum satis)</option>\`;
            }
        });

        return \`
            <section class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'); height: 40vh;">
                <div class="hero-content">
                    <h1>Batch Dosage Calculator</h1>
                    <p>Eliminate manual conversion errors on the production floor.</p>
                </div>
            </section>
            <section class="section-container">
                <div class="calc-card">
                    <h2 style="color: var(--safety-blue); margin-bottom: 2rem; text-align: center;"><i class="fa-solid fa-calculator"></i> Calculate Maximum Dosage</h2>
                    
                    <div class="form-group">
                        <label>Select Additive & Target Category</label>
                        <select id="calc-additive">
                            \${optionsHtml}
                        </select>
                        <small style="color: var(--muted-text); display:block; margin-top: 0.5rem;">Note: Additives with GMP are disabled as they are permitted at Quantum satis.</small>
                    </div>
                    
                    <div class="form-group">
                        <label>Total Batch Size (kg or Liters)</label>
                        <input type="number" id="calc-batch" placeholder="E.g. 500" min="0" step="0.1">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" onclick="app.calculateDosage()">Calculate Maximum Permitted Limit</button>
                    
                    <div id="calc-result" class="calc-result" style="display: none;">
                        <span style="color: var(--muted-text); text-transform: uppercase; font-weight: 600; font-size: 0.9rem;">Maximum Legal Dosage (Absolute)</span>
                        <h3 id="calc-value">0 g</h3>
                        <p id="calc-desc" style="font-size: 0.95rem;"></p>
                    </div>
                </div>
            </section>
        \`;
    }

    initCalculator() {
        // Nothing needed on load
    }

    calculateDosage() {
        const select = document.getElementById('calc-additive');
        const batchSize = parseFloat(document.getElementById('calc-batch').value);
        const resultDiv = document.getElementById('calc-result');
        const valueDiv = document.getElementById('calc-value');
        const descDiv = document.getElementById('calc-desc');
        
        if (!select.value || isNaN(batchSize) || batchSize <= 0) {
            alert('Please select an additive and enter a valid batch size.');
            return;
        }
        
        const mpl = parseFloat(select.value);
        const unit = select.options[select.selectedIndex].getAttribute('data-unit');
        
        let targetGrams = 0;
        
        // Batch size is in kg or L
        if (unit === 'mg/kg' || unit === 'mg/L') {
            // mg per kg * total kg = total mg
            // mg / 1000 = grams
            targetGrams = (mpl * batchSize) / 1000;
        } else if (unit === '%') {
            // (percentage / 100) * total kg = total kg of additive
            // kg * 1000 = grams
            targetGrams = (mpl / 100) * batchSize * 1000;
        }

        resultDiv.style.display = 'block';
        
        if (targetGrams >= 1000) {
            valueDiv.innerText = \`\${(targetGrams / 1000).toFixed(3)} kg\`;
        } else {
            valueDiv.innerText = \`\${targetGrams.toFixed(2)} g\`;
        }
        
        descDiv.innerText = \`Based on an MPL of \${mpl} \${unit} for a \${batchSize} kg/L batch.\`;
    }

    ResourcesView() {
        return \`
            <section class="hero" style="background: linear-gradient(135deg, rgba(243, 156, 18, 0.85), rgba(231, 76, 60, 0.85)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80') center/cover; height: 50vh;">
                <div class="hero-content">
                    <h1>Global Standards & Nutrition</h1>
                    <p>Our database is grounded in the world's most trusted agricultural and nutritional authorities.</p>
                </div>
            </section>
            <section class="section-container" style="margin-top: -80px; position: relative; z-index: 10;">
                <div class="resources-grid">
                    <a href="https://www.fao.org/about/about-fao/en/" target="_blank" class="resource-card" style="text-decoration: none; color: inherit; display: block;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/FAO_logo.svg" alt="FAO Logo" style="height: 100px;">
                        <h3 style="margin-top: 1rem;">FAO Global Info</h3>
                        <p style="color: #666;">Food and Agriculture Organization of the United Nations. Access official global agricultural and food safety data.</p>
                        <span style="display: inline-block; margin-top: 1.5rem; color: var(--safety-blue); font-weight: 700; background: var(--safety-blue-light); padding: 0.5rem 1rem; border-radius: var(--radius-full);">Visit FAO <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                    </a>
                    
                    <a href="https://www.eatright.org/" target="_blank" class="resource-card" style="text-decoration: none; color: inherit; display: block;">
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80" alt="Nutrition Plate" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-md);">
                        <h3 style="margin-top: 1.5rem;">EatRight Nutrition</h3>
                        <p style="color: #666;">Academy of Nutrition and Dietetics. Trusted guidance on diet, nutrition, and food science standards.</p>
                        <span style="display: inline-block; margin-top: 1.5rem; color: var(--accent-orange); font-weight: 700; background: #fef5e7; padding: 0.5rem 1rem; border-radius: var(--radius-full);">Visit EatRight <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
                    </a>
                </div>
            </section>
        \`;
    }

    DisclaimerView() {
        return `
            <section class="hero" style="background-image: linear-gradient(rgba(26,37,47,0.8), rgba(26,37,47,0.8)), url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80'); height: 40vh;">
                <div class="hero-content">
                    <h1>Legal Disclaimer & References</h1>
                </div>
            </section>
            <section class="section-container">
                <div style="background: var(--white); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); max-width: 900px; margin: 0 auto;">
                    <h2 style="color: #c0392b; margin-bottom: 1.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> Disclaimer</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">The data provided on Ingre Net is for educational and informational purposes only. While our team of Bio System Technology students strives for absolute accuracy, regulatory limits (MPLs) are subject to continuous change by international and local authorities (Codex, FDA, EU, SL Food Act).</p>
                    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 3rem; font-weight: 600; color: var(--dark-text);">This tool should be used as a primary reference, but all dosages and formulations must be independently verified by your facility's Quality Assurance department prior to commercial production.</p>
                    
                    <h3 style="color: var(--safety-blue); border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem;">References</h3>
                    <p style="color: #666; line-height: 1.6;">Data compiled utilizing public texts from the:</p>
                    <ul style="list-style-position: inside; color: #666; line-height: 1.8; margin-top: 0.5rem; padding-left: 1rem;">
                        <li>Codex General Standard for Food Additives (GSFA)</li>
                        <li>FDA Code of Federal Regulations (Title 21)</li>
                        <li>EU Regulation (EC) No 1333/2008</li>
                        <li>Sri Lanka Food (Preservatives and Additives) Regulations</li>
                    </ul>
                </div>
            </section>
        `;
    }
}

// Initialize App
const app = new App();
