const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const output = document.querySelector(".output");

const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchForm.onsubmit = async (event) => {
    event.preventDefault(); 
    const searchTerm = searchInput.value;

    output.innerHTML = "";

    try {
        const response = await axios.get(`${API}${searchTerm}`);
        for(let i = 0; i < response.data.length; i += 1) {
            const { word, phonetic, meanings } = response.data[i];
           
            let meaningsBlock = "";
            for(let j = 0; j < meanings.length; j += 1) {
                const { definitions } = meanings[j];
                 
                let definitionsBlock = `<div class="definition-block">`;
                for(let k = 0; k < definitions.length; k += 1) {
                    definitionsBlock += `<div class="definition">${k + 1}. ${definitions[k].definition}</div>`;
                }
                definitionsBlock += `</div>`;

                meaningsBlock += definitionsBlock;       
            }
            
            output.innerHTML += `
                <div class="word">${word}</div>
                <div class="phonetic">${phonetic}</div>
                ${meaningsBlock}
            `;
        }
    } catch(error) {
        console.log(error.response.data);
    }
}

        