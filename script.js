  async function fetchRecipes() {
    const response = await fetch('data.json');
    return response.json();
  }

  function normalizeText(text) {
    return text.toLowerCase().replace(/[ぁ-ん]/g, (match) => {
      const map = {'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ', 'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ', 'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ', 'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト', 'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ', 'は': 'ハ', 'ひ': 'ヒ', 'ふ': 'フ', 'へ': 'ヘ', 'ほ': 'ホ', 'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ', 'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ', 'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ', 'わ': 'ワ', 'を': 'ヲ', 'ん': 'ン'};
      return map[match] || match;
    });
  }

  async function searchRecipes() {
    const ingredientInput = document.getElementById('ingredient').value;
    const quantityInput = parseInt(document.getElementById('quantity').value, 10) || Infinity;
    const normalizedIngredient = normalizeText(ingredientInput);

    const recipes = await fetchRecipes();

    const results = recipes.filter(recipe =>
      recipe.ingredients.some(item =>
        normalizeText(item.name).includes(normalizedIngredient) && item.amount <= quantityInput
      )
    );

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>該当するレシピがありません。</p>';
    } else {
      results.forEach(recipe => {
        resultsContainer.innerHTML += `
          <div class="recipe">
            <h2>${recipe.name}</h2>
            <p>調理時間: ${recipe.time}分</p>
            <ul>
              ${recipe.ingredients.map(item => `<li>${item.name}: ${item.amount}${item.unit}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">レシピ詳細はこちら</a>
          </div>
        `;
      });
    }
  }
