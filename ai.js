//Data display and show 
const loadData = async (dataLimit, sortByDate) => {
    // Show the loader
    toggleSpinner(true);
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const response = await fetch(url);
    const data = await response.json();
  
    let tools = data.data.tools;
  
    // Sort tools by date in ascending order
    if (sortByDate) {
      tools = tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    }
  
    displayTools(tools, dataLimit);
  };
  
  const displayTools = (tools, dataLimit) => {
    const toolsContainer = document.getElementById("tools-container");
    toolsContainer.innerHTML = ""; 
    let displayedTools;
  
    if (dataLimit) {
        displayedTools = tools.slice(0, dataLimit);
      } else {
          displayedTools = tools;
      }
  
  displayedTools.forEach((tool) => {
    console.log("first",tool);
      const toolsDiv = document.createElement("div");
      toolsDiv.classList.add("col", "mb-3");
      toolsDiv.innerHTML = `
        <div class="card h-100 p-3">
          <img style="" src="${tool.image}" class="w-100 h-75" alt="...">
          <div class="">
            <h4 class="card-title my-4">Feature</h4>
            <div style="line-height: 10px" class="mb-4">
              ${tool.features.slice(0, 3).map((feature, index) => `<p>${index + 1}. ${feature}</p>`).join('')} 
              ${tool.features.length < 3 ? `<p>${tool.features.length + 1}. NO New feature</p>` : ''}
            </div>
            <hr>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>${tool.name}</h5>
              <span class="fs-6"><i class="bi bi-calendar3"></i> ${tool.published_in}</span>
            </div>
            <div><button onclick="loadDetails('${tool.id}')" style="border-radius: 25px; background-color: #ebcccc;" ; class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-arrow-right-short text-danger fs-4" ></i></button></div>
          </div>
        </div>
      `;
      toolsContainer.appendChild(toolsDiv);
    });
    
    const showAllButton = document.getElementById("show-all");
    if (!dataLimit || dataLimit >= tools.length) {
      showAllButton.classList.add("d-none");
    } else {
      showAllButton.classList.remove("d-none");
    }
    
    // Hide the loader
    toggleSpinner(false);
  };
  
  const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
  }
  
  const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    loadData(dataLimit);
  };
  
  document.getElementById("btn-show-all").addEventListener("click", function () {
    
    searchProcess();
  });
  
  // Sort the tools 
  const sortButton = document.querySelector(".btn-danger").addEventListener("click", () => {
    loadData(null, true);
  });
  
  
  // // Modal functional
  const loadDetails= async id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
  }
  
  const displayDetails = modal =>{
    console.log(modal);
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = ''; 
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("row");
    modalDiv.innerHTML =`
      <div class="col-lg-6">
        <div class="border border-danger rounded p-3" style="background-color: #f0c1c1;">
          <h4 class="mb-4">${modal.description}</h4>
          <div class="row">
            <div class="col-md-4 mb-3 mb-md-0">
              <p class="text-success rounded p-4 text-center  text-green" style="background-color: #ebe9e9;">${modal.pricing ? modal.pricing[0].plan : 'Free Plan/ '}</br>
              ${modal.pricing ? modal.pricing[0].price : 'Basic'}</p>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <p class="text-success rounded p-4 text-center  text-orange" style="background-color: #ebe9e9;">${modal.pricing ? modal.pricing[1].plan : 'Free Plan/ '}</br>
              ${modal.pricing ? modal.pricing[1].price : 'Pro'}</p>
            </div>
            <div class="col-md-4">
              <p class="text-success rounded p-4 text-center  text-danger" style="background-color: #ebe9e9;">${modal.pricing ? modal.pricing[2].plan : 'Free Plan/ '}
              ${modal.pricing ? modal.pricing[2].price : 'Enterprise'}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="mt-4">Features</h3>
              <ul>
                <li>${modal.features[1].feature_name}</li>
                <li>${modal.features[2].feature_name}</li>
                <li>${modal.features[3].feature_name}</li>
              </ul>
            </div>
            <div class="col-md-6">
              <h3 class="mt-4">Integrations</h3>
              <ul>
                <li>${modal.integrations[0]}</li>
                <li>${modal.integrations[1]}</li>
                <li>${modal.integrations[2]}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mt-4 mt-lg-0">
  
        <div>
        <div class="position-relative">
        <img src="${modal.image_link[0]}" class="img-fluid" >
          <div style="top:25px; right:25px;" class="bg-danger rounded position-absolute p-2
              ${modal.accuracy.score ? 'Accuracy' : 'd-none'}">
          <h6 class="text-white">
              ${modal.accuracy.score ? `<span>${modal.accuracy.score*100}</span>% accuracy` : ''}
          </h6>
          </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <h4>${modal.input_output_examples ? modal.input_output_examples[0].input : "Give us some example?"}</h4>
          <p>${modal.input_output_examples ? modal.input_output_examples[1].input : "Give us some example?"}</p>
        </div>
      </div>

    `;
    modalContainer.appendChild(modalDiv);
  }
  
  
  
  
  loadData(6);
  
  
  
  