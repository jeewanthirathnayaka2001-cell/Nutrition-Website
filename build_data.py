import json

raw_preservatives = """
Sodium Metabisulfite (SMS / SMBS)	E223	1. Preservative 2. Antioxidant 3. Bleaching agent / Flour treatment agent	1. Dried fruits and vegetables 2. Wines, ciders 3. Crustaceans 4. Fruit juices	1. Dried fruits: Up to 2000 mg/kg 2. Wines: 150 mg/L to 200 mg/L 3. Crustaceans: 50 mg/kg to 150 mg/kg 4. General Use (FDA): GMP	mg/kg or mg/L	1. Codex Alimentarius 2. FAO / WHO 3. EU 4. US FDA CFR 5. Sri Lanka	1. Allergen Labeling 2. Vitamin B1 Prohibition 3. ADI / Safety 4. Measurement	2025 / 2026
Sodium Benzoate	E211	Preservative	1. Liquid egg product 2. Vegetable pulp 3. Semi-preserved fish 4. Food supplements 5. Fat spreads 6. Fruit preparations 7. Water-based drinks 8. Wines	1. 5000 mg/kg 2. 3000 mg/kg 3. 2000 mg/kg 4. 2000 mg/kg 5. 1000 mg/kg 6. 1000 mg/kg 7. 250 mg/kg 8. 1000 mg/kg	mg/kg (ppm) and % (FDA)	1. Codex Alimentarius 2. FAO/WHO 3. EU 4. US FDA 5. Sri Lanka	1. Functional constraints 2. Group classification 3. FDA/GRAS 4. Potential interaction 5. Labeling 6. ADI	2025 / 2026
Potassium Sorbate	E202	Preservative	1. Vegetable purees 2. Flavoured drinks 3. Whey cheeses 4. Fruit preparations 5. Alcoholic beverages 6. Meat products	1. 1000 mg/kg 2. 500 mg/kg 3. 1000-3000 mg/kg 4. 1000-1500 mg/kg 5. 200-500 mg/kg 6. 200 mg/kg	mg/kg (ppm) and %	1. Codex 2. FAO/WHO 3. EU 4. FDA 5. Sri Lanka	1. Group regulation 2. Effectiveness depends on pH 3. Recent EU extension 4. Safety evaluations 5. Labeling 6. ADI/safety	2025 / 2026
Sorbic Acid	E200	Preservative	1. Liquid egg 2. Whey protein cheese 3. Confectionery 4. Flavoured drinks 5. Fruit juice 6. Cooked fish 7. Poultry/meat 8. Baked goods 9. Salads 10. Sauces	Up to 5000 mg/kg depending on category	mg/kg and %	Codex, FAO/WHO, EU, FDA, Sri Lanka	Functional grouping, Effectiveness at acidic pH, Safety evaluations	2025 / 2026
Sodium Nitrite	E250	Preservative & colour-fixing agent	1. Cured non-heat treated meat 2. Cured heat-treated meat 3. Smoked/dried fish	1. 80 mg/kg 2. 80-100 mg/kg 3. 80-200 mg/kg	mg/kg and ppm	Codex, FAO/WHO, EU, US FDA / USDA, Sri Lanka	Nitrosamine Risk, ADI/Safety, Synergistic Ingredients, Pre-mixing	2025 / 2026
Sodium Nitrate	E251	Preservative & colour-fixing agent	1. Cured non-heat treated meat 2. Cured heat-treated meat 3. Ripened cheese 4. Pickled fish	1. Meat: 150-300 mg/kg 2. Cheese: 50-150 mg/kg 3. Fish: up to 500 ppm	mg/kg and ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Conversion to Nitrite, Nitrosamine Risk	2025 / 2026
Propionic Acid	E280	Preservative	1. Bakery wares 2. Cheese 3. Grain products	1. Bakery wares: 1000-3000 mg/kg 2. Cheese: GMP up to 3000 mg/kg 3. General: GMP	mg/kg and GMP	Codex, FAO / WHO, EU, US FDA, Sri Lanka	Sensory & Physical Impact, Natural Occurrence, ADI/Safety, Group Regulation	2025 / 2026
Sulfur Dioxide	E220	Preservative, Antioxidant, Bleaching agent	1. Dried fruits 2. Wines 3. Fruit juices 4. Herbs and spices	1. Dried fruits: Up to 2000 mg/kg 2. Wines: 150-350 mg/L 3. Juices: 50 mg/kg 4. General: 10-2000 ppm	mg/kg, mg/L, ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Allergen Labeling, Vitamin B1 Prohibition, ADI/Safety, Group Measurement	2025 / 2026
Sodium Metabisulfite	E223	Preservative, Antioxidant, Bleaching agent	1. Dried fruits 2. Wines 3. Crustaceans 4. Fruit juices	1. Dried fruits: Up to 2000 mg/kg 2. Wines: 150-200 mg/L 3. Crustaceans: 50-150 mg/kg 4. General: GMP	mg/kg, mg/L, ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Allergen Labeling, Vitamin B1 Prohibition, ADI/Safety, Measurement	2025 / 2026
Potassium Metabisulfite	E224	Preservative, Antioxidant, Bleaching agent	1. Wines, ciders 2. Fruit juices 3. Dried fruits 4. Beer	1. Wines: 150-400 mg/L 2. Dried fruits: Up to 2000 mg/kg 3. Juices: 50 mg/kg 4. General: GMP	mg/kg, mg/L, ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Allergen Labeling, Potassium vs. Sodium, Vitamin B1 Prohibition, ADI/Safety	2025 / 2026
Sodium Bisulfite	E222	Preservative, Antioxidant, Bleaching agent	1. Fruit preserves 2. Beverages 3. Dried fruits 4. Canned seafood	1. Preserves: 10-500 mg/kg 2. Beverages: 50-200 mg/L 3. Dried fruits: Up to 2000 mg/kg 4. General: GMP	mg/kg, mg/L, ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Allergen Labeling, Vitamin B1 Prohibition, Fresh Food Ban, ADI/Safety	2025 / 2026
Natamycin	E235	Preservative / Antimycotic agent	1. Cheese 2. Cured meats	1. Cheese: Up to 40 mg/kg / 20 ppm / 1 mg/dm2 2. Cured meats: 20 mg/kg / 1 mg/dm2	mg/kg, ppm, mg/dm2	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Bacterial Neutrality, Application Method, EU Depth Rule, ADI/Safety	2025 / 2026
Nisin	E234	Preservative	1. Processed cheese 2. Clotted cream 3. Pasteurized liquid egg 4. Canned puddings	1. Cheese/Egg: 12.5 mg/kg 2. Cream: 10 mg/kg 3. FDA limit: 250 ppm	mg/kg and ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Targeted Action, Heat & pH Stability, ADI/Safety	2025 / 2026
Parabens	E218, E219, E214, E215	Preservative	1. Confectionery 2. Meat pastes 3. Marinated fish 4. Liquid supplements	1. Confectionery: 300-1000 mg/kg 2. Meat pastes: Up to 1000 mg/kg 3. General: 0.1%	mg/kg, %, ppm	Codex, FAO/WHO, EU, US FDA, Sri Lanka	EU Propylparaben Ban, Consumer Rejection, ADI/Safety	2025 / 2026
Acetic Acid	E260	Preservative, Acidity regulator	1. Pickled vegetables 2. Condiments 3. Bakery wares 4. Dairy products	1. General: GMP 2. Infant foods: 5000 mg/kg 3. General FDA: 0.15%-3.0%	GMP / Quantum satis, %	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Sensory Limits, Microbial Focus, ADI/Safety	2025 / 2026
Lactic Acid	E270	Preservative, Acidity regulator	1. Dairy products 2. Beverages 3. Confectionery 4. Meat products	1. General: GMP 2. Infant foods: GMP (L+ only) 3. FDA: 0.1%-2.0%	GMP / Quantum satis, %	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Isomer Restriction, Sensory Profile, ADI/Safety	2025 / 2026
Dimethyl Dicarbonate	E242	Preservative / Cold Sterilant	1. Water-based drinks 2. Wines 3. Liquid tea concentrates	1. Beverages: 250 mg/kg 2. Wines: 200 mg/kg	mg/kg or mg/L	Codex, FAO/WHO, EU, US FDA, Sri Lanka	Zero Residue, Worker Safety, Methanol Byproduct, ADI/Safety	2025 / 2026
"""

raw_colours = """
Curcumin	E100	Colour	Confectionery, Sauces, Fats & Oils	GMP / 500	mg/kg	GSFA Table 3, EU 1333/2008, SL Regs	Natural yellow (Turmeric), GMP in most categories	14-Nov-25
Riboflavins	E101	Colour	Dairy products, Cereals, Bakery wares	GMP / 300	mg/kg	GSFA Table 3, FDA 21 CFR, SL Regs	Vitamin B2 source, Highly heat stable	14-Nov-25
Tartrazine	E102	Colour	Beverages, Sweets Snacks	100 (SL) / 300 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Synthetic (Yellow 5), EU warning label required	16-Mar-26
Quinoline Yellow	E104	Colour	Smoked fish, Seasonings, Edible ices	200 (GSFA)	mg/kg	GSFA, EU, SL Regs	Banned in USA/Canada, Restricted in EU	7-Jan-26
Sunset Yellow FCF	E110	Colour	Breakfast cereals, Dessert, Drinks	100 (SL) / 300 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Synthetic (Yellow 6), Link to hyperactivity	16-Mar-26
Carmoisine	E122	Colour	Jams & Jellies, Fruit fillings, Beverages	100 (SL) / 500 (GSFA)	mg/kg	GSFA, EU, SL Regs	Azorubine, Synthetic red, Not permitted in US	14-Jan-11
Ponceau 4R	E124	Colour	Ices & Sherbets, Processed fish, Pastries	100 (SL) / 500 (GSFA)	mg/kg	GSFA, EU, SL Regs	Cochineal Red A, Synthetic azo dye	14-Jan-11
Erythrosine	E127	Colour	Glacé cherries, Cocktail cherries	100 (SL) / 200 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Synthetic (Red 3), Iodine containing colour	16-Mar-26
Allura Red AC	E129	Colour	Seasonings, Cereals, Meat products	100 (SL) / 300 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Synthetic (Red 40), Widely used in US	16-Mar-26
Indigotine	E132	Colour	Bakery wares, Dairy analogues, Sweets	100 (SL) / 300 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Indigo Carmine (Blue 2), Synthetic dye	16-Mar-26
Brilliant Blue FCF	E133	Colour	Dairy desserts, Ices, Soft drinks	100 (SL) / 100 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Synthetic (Blue 1), Very stable colour	16-Mar-26
Chlorophylls	E140	Colour	Fats & Oils, Chewing gum, Fruit prep	GMP	GMP	GSFA, EU, SL Regs	Natural green from plants, Generally safe	16-Jul-25
Copper Chlorophyllins	E141	Colour	Canned vegetables, Dairy products, Sauces	500 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Higher light stability than E140	16-Jul-25
Fast Green FCF	INS 143	Colour	Edible ices, Beverages, Desserts	100 (SL) / 100 (GSFA)	mg/kg	GSFA, FDA, SL Regs	FD&C Green No. 3, Banned in EU/UK	16-Mar-26
Plain Caramel (I)	E150a	Colour	Soups & Sauces, Spirits, Bakery wares	GMP	GMP	GSFA, FDA, SL Regs	Class I Caramel, No ammonia/sulfite used	16-Mar-26
Ammonia Caramel (III)	E150c	Colour	Beer, Gravy, Sauces	50000 (GSFA)	mg/kg	GSFA, EU, SL Regs	Class III Caramel, Complex brown hue	16-Jul-25
Brilliant Black BN	E151	Colour	Fish roe, Sauces, Sweets	500 (GSFA)	mg/kg	GSFA, EU	Black PN, Synthetic, Not permitted in US	16-Jul-25
Vegetable Carbon	E153	Colour	Cheese, Confectionery, Decorations	GMP	GMP	GSFA, EU	Activated charcoal, Banned in US as food colour	16-Jul-25
Brown HT	E155	Colour	Chocolate cakes, Biscuits, Dairy	50 (GSFA)	mg/kg	GSFA, EU	Chocolate Brown HT, Synthetic azo dye	16-Jul-25
Beta-Carotene (Veg)	E160a	Colour	Margarine, Fats & Oils, Beverages	1000 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Provitamin A source, Natural orange/yellow	16-Mar-26
Annatto (Bixin)	E160b	Colour	Cheese, Butter, Snacks	1000 (GSFA)	mg/kg	GSFA, FDA, SL Regs	Natural seeds extract, Solvent-based extraction	16-Mar-26
Paprika Extract	E160c	Colour	Snacks, Seasonings, Processed meat	GMP	GMP	GSFA, FDA, SL Regs	Natural red pigment, Contains Capsanthin	16-Mar-26
Lycopene (Synth)	E160d	Colour	Sauces, Beverages, Desserts	5000 (GSFA)	mg/kg	GSFA, EU, FDA	Tomato-like red hue, High antioxidant capacity	16-Mar-26
Beetroot Red	E162	Colour	Yogurt, Meat products, Ices	GMP	GMP	GSFA, FDA, SL Regs	Betanin from beets, pH and heat sensitive	16-Mar-26
Anthocyanins	E163	Colour	Beverages, Fruit prep, Confectionery	GMP	GMP	GSFA, FDA, SL Regs	From grape skins/veg, pH sensitive (red-blue)	16-Mar-26
"""

raw_emulsifiers = """
Lecithin	E322	Emulsifier, antioxidant	Chocolate, biscuit, bakery products, salad dressing	According to GMP	%	Codex GSFA, FDA, EU	May cause allergic reactions in individuals sensitive to soy or egg sources	June 2025
Mono and diglyceride of fatty acid	E471	Emulsifier	Bakery products, ice cream, margarine, cake, biscuit	According to GMP	%	Codex GSFA, FDA, EU	Generally recognized as safe (GRAS)	June 2025
Polysorbates	E433 (E434,E435,E436)	Emulsifier	Ice cream, baked product	0.5 - 1.0	%	Codex GSFA, FDA, EU	May cause mild digestive sensitivity, Synthetic origin	June 2025
Datem	E472e	Emulsifier	Bread, cake, processed dough	According to GMP	%	Codex GSFA, FDA, EU	Synthetic emulsifier with usage limits	June 2025
Carrageenan	E407	Emulsifier, thickener	Dairy products	According to GMP	%	Codex GSFA, FDA, EU	Controversial due to digestive concerns	June 2025
Guar gum	E412	Emulsifier, thickener	Sauce, beverage, dessert	According to GMP	%	Codex GSFA, FDA, EU	May cause bloating in high amounts	June 2025
Gum arabic	E414	Emulsifier, stabilizer	Confectionary beverages	According to GMP	%	Codex GSFA, FDA, EU	Rare allergic reactions, Generally well tolerated	June 2025
Xanthan gum	E415	Emulsifier, thickener	Sauce, bakery products	According to GMP	%	Codex GSFA, FDA, EU	Safe at typical usage levels	June 2025
Sodium stearoyl-2 lactylate	E481	Emulsifier	Bakery products	0.5	%	Codex GSFA, FDA, EU	Approved emulsifier with limits	June 2025
Glucerol monostearate	E471	Emulsifier	Bakery products, ice cream	According to GMP	%	Codex GSFA, FDA, EU	Generally safe, May be animal- or plant-derived	June 2025
Sucrose esters of fatty acids	E473	Emulsifier	Bakery products, dairy products	1	%	Codex GSFA, FDA, EU	Regulated usage limits	June 2025
Polyglycerol esters of fatty acids	E475	Emulsifier	Chocolate, baked products	According to GMP	%	Codex GSFA, FDA, EU	Approved within limits	June 2025
Sorbitan monostearate	E491	Emulsifier	Bakery products, confectionary	0.5	%	Codex GSFA, FDA, EU	Safe within regulated limits, mild digestive effects	June 2025
Sodium Caseinates	E469	Emulsifier, stabilizer	Dairy products, processed foods	According to GMP	%	Codex GSFA, FDA, EU	Milk-derived allergen	June 2025
Ammonium phosphatides	E442	Emulsifier	Chocolate, cocoa products	According to GMP	%	Codex GSFA, FDA, EU	Approved emulsifier, Usage limits apply	June 2025
Hydroxypropyl methyl cellulose	E464	Emulsifier, thickener	Bakery products, sauces	According to GMP	%	Codex GSFA, FDA, EU	Generally safe, mild digestive effects	June 2025
Methyl cellulose	E461	Emulsifier, thickener	Processed foods	According to GMP	%	Codex GSFA, FDA, EU	Safe at food-use levels	June 2025
Stearyl tartrate	E483	Emulsifier	Bakery products, dough products	0.5	%	Codex GSFA, FDA, EU	Approved with usage limits	June 2025
Gellan gum	E418	Emulsifier, stabilizer	Beverages	According to GMP	%	Codex GSFA, FDA, EU	Generally safe, rare digestive sensitivity	June 2025
Sucroglycerides	E474	Emulsifier	Bakery products, confectionary	1	%	Codex GSFA, FDA, EU	Low toxicity at permitted levels	June 2025
Propylene glycol esters of fatty acids	E477	Emulsifier	Sauce	According to GMP	%	Codex GSFA, FDA, EU	Regulated additive, generally safe	June 2025
Calcium stearoyl lactylate	E482	Emulsifier	Processed foods	0.5	%	Codex GSFA, FDA, EU	Approved with limits	June 2025
Polyphosphate	E452	Emulsifier, stabilizer	Processed meat, sea food	According to GMP	%	Codex GSFA, FDA, EU	Excess may affect mineral balance	June 2025
Polyglycerol polyricinoleate	E452	Emulsifier	Chocolate, fat spread	According to GMP	%	Codex GSFA, FDA, EU	Approved emulsifier	June 2025
Propylene glycol alginate	E405	Emulsifier, stabilizer	Sauce, beverage, bakery products	According to GMP	%	Codex GSFA, FDA, EU	Approved additive, within limits	June 2025
"""

raw_antioxidants = """
Ascorbic acid	E300	Antioxidant	Beverages, fruit products	According to GMP	%	Codex GSFA, FDA	High doses may cause gastrointestinal discomfort	June 2025
Tocopherols	E306-309	Antioxidant	Oils, fats	According to GMP	%	Codex GSFA, FDA	Generally safe, Excess supplementation may have effects	June 2025
Butylated Hydroxytoluene (BHT)	E321	Antioxidant	Fats, oils, chewing gum	0.01%	%	Codex GSFA, FDA	Permitted within strict limits in many regions	June 2025
Citric acid	E330	Antioxidant	Canned foods	According to GMP	%	Codex GSFA, FDA	Generally safe, excess may erode dental enamel	June 2025
Propyl gallate	E310	Antioxidant	Snack foods, fats, oils	0.01%	%	Codex GSFA, FDA	Approved antioxidant with usage limits	June 2025
Tertiary Butylhydroquinone (TBHQ)	E319	Antioxidant	Snack foods, oils, packaged baked goods	0.01%	%	Codex GSFA, FDA	Strictly regulated maximum limits	June 2025
Sodium ascorbate	E301	Antioxidant	Meat products, processed foods	According to GMP	%	Codex GSFA, FDA	Generally safe, high intake may affect sodium balance	June 2025
Ascorbyl palmitate	E304	Antioxidant	Fats, oils	According to GMP	%	Codex GSFA, FDA	Fat-soluble derivative of vitamin C	June 2025
Butylated Hydroxyanisole (BHA)	E320	Antioxidant	MD fruit drinks	0.01%	%	Codex GSFA, FDA	Regulated due to safety evaluations	June 2025
Rosemary extract	E392	Antioxidant	Vegetable Oils, margarine, processed meats	0.01%	%	Codex GSFA	Generally safe (natural extract)	June 2025
Erythorbic acid	E315	Antioxidant	Meat, canned foods	According to GMP	%	Codex GSFA, FDA	Not a vitamin, structurally related to ascorbic acid	June 2025
Alpha tocopherol	E307	Antioxidant	Vegetable oil	According to GMP	%	Codex GSFA, FDA	Safe at typical dietary levels	June 2025
Octyl gallate	E311	Antioxidant	Fats, oil	0.01%	%	Codex GSFA, FDA	Approved antioxidant	June 2025
Dodecyl gallate	E312	Antioxidant	Fat emulsions	0.01%	%	Codex GSFA, FDA	Approved within regulatory limits	June 2025
Tartaric acid	E334	Antioxidant, acidulant	Fruit products, beverages	According to GMP	%	Codex GSFA, FDA	Generally safe, may cause digestive discomfort	June 2025
"""

raw_stabilizers = """
Pectin	E440	Stabilizer, Gelling agent	Jams, yoghurt, beverages	GMP	GMP	GSFA, EU, SL Regs	Natural (fruit-based), gel formation	14-Nov-25
Agar	E406	Stabilizer, Thickener	Desserts, jellies, dairy	GMP	GMP	GSFA, EU, SL	Seaweed origin, strong gel	16-Jul-25
Carrageenan	E407	Stabilizer, Thickener	Milk, ice cream, meat	1000	mg/kg	GSFA, EU, FDA	May cause sensitivity in excess	16-Jul-25
Locust Bean Gum	E410	Stabilizer, Thickener	Ice cream, dairy, sauces	5000	mg/kg	GSFA, EU	Works with carrageenan	16-Jul-25
Xanthan Gum	E415	Stabilizer, Thickener	Dressings, beverages, gluten-free foods	1000	mg/kg	GSFA, EU, FDA	Highly stable at wide pH/temp	16-Mar-26
Gum Arabic	E414	Stabilizer, Emulsifier	Soft drinks, confectionery	10000	mg/kg	GSFA, EU	Acacia tree source	16-Jul-25
Sodium Alginate	E401	Stabilizer, Gelling agent	Ice cream, sauces	1000	mg/kg	GSFA, EU	Forms gel with calcium	16-Jul-25
Calcium Alginate	E404	Stabilizer, Gelling agent	Reformed foods, desserts	1000	mg/kg	GSFA, EU	Used in molecular gastronomy	16-Jul-25
Potassium Alginate	E402	Stabilizer	Dairy, desserts	1000	mg/kg	GSFA	Similar to sodium alginate	16-Jul-25
Gelatin	INS 441	Stabilizer, Gelling agent	Desserts, dairy, confectionery	GMP	GMP	GSFA, FDA	Animal origin protein	16-Mar-26
Modified Starch	E1404-1450	Stabilizer, Thickener	Soups, sauces, dairy	20000	mg/kg	GSFA, EU	Chemically modified starch	16-Mar-26
Carboxymethyl Cellulose (CMC)	E466	Stabilizer, Thickener	Ice cream, bakery, beverages	10000	mg/kg	GSFA, FDA	Prevents ice crystal formation	16-Mar-26
Methylcellulose	E461	Stabilizer, Thickener	Bakery, sauces	10000	mg/kg	GSFA, EU	Forms gel when heated	16-Jul-25
Hydroxypropyl Methylcellulose (HPMC)	E464	Stabilizer	Bakery, gluten-free foods	10000	mg/kg	GSFA	Improves texture	16-Jul-25
Tragacanth	E413	Stabilizer, Thickener	Sauces, dressings	10000	mg/kg	GSFA	Natural gum, expensive	7-Jan-26
Tara Gum	E417	Stabilizer	Dairy, desserts	5000	mg/kg	GSFA	Alternative to guar gum	7-Jan-26
Gellan Gum	E418	Stabilizer, Gelling agent	Beverages, desserts	1000	mg/kg	GSFA	Clear gel formation	16-Mar-26
Konjac Gum	E425	Stabilizer, Thickener	Noodles, jelly, vegan foods	10000	mg/kg	GSFA	High water absorption	16-Mar-26
Microcrystalline Cellulose	E460	Stabilizer, Bulking agent	Low-fat foods, dairy	GMP	GMP	GSFA, FDA	Fat replacer	16-Mar-26
"""

def parse_lines(raw):
    # Parses TSV and standardizes it to JS list of objects
    objs = []
    lines = raw.strip().split('\\n')
    for line in lines:
        if not line.strip(): continue
        parts = line.split('\\t')
        if len(parts) < 9:
            # fill missing
            parts.extend([''] * (9 - len(parts)))
        
        obj = {
            'name': parts[0].strip(),
            'eNumber': parts[1].strip(),
            'functionalClass': parts[2].strip(),
            'foods': parts[3].strip(),
            'mpl': parts[4].strip() + ' ' + parts[5].strip(),
            'regSource': parts[6].strip(),
            'notes': parts[7].strip(),
            'lastUpdated': parts[8].strip()
        }
        objs.append(obj)
    return objs

all_data = parse_lines(raw_preservatives) + parse_lines(raw_colours) + parse_lines(raw_emulsifiers) + parse_lines(raw_antioxidants) + parse_lines(raw_stabilizers)

js_content = "const dbData = " + json.dumps(all_data, indent=4) + ";"

with open('c:/Users/Dulanji Rathnayaka/Desktop/Nutrition-Website/data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Wrote data.js thoroughly!")
