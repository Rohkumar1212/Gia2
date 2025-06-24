const BASE_IMAGE_URL = "https://gallery.giaonline.org/api/image/";

async function loadGalleryImages() {
  const API_URL =
    "https://gallery.giaonline.org/api/gallery/by-category?category=sri_mukesh_mla";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();
    console.log(result);

    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = "";

    if (!Array.isArray(result.data)) {
      console.error("API data is not an array:", result.data);
      return;
    }

    result.data.forEach((item) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-4 col-sm-6 mb-4";

      const imageSrc = BASE_IMAGE_URL + item.image;

      col.innerHTML = `
                    <div class="card h-100 shadow-sm">
                      <img 
                        src="${imageSrc}" 
                        class="card-img-top img-fluid popup-image"
                        alt="Gallery Image"                          
                        style="object-fit: cover; height: 250px; cursor: zoom-in;"
                      />
                    </div>
                  `;

      galleryContainer.appendChild(col);

      // Attach click handler for popup
      const img = col.querySelector(".popup-image");
      img.addEventListener("click", () => {
        const popup = document.getElementById("imagePopup");
        const popupImg = document.getElementById("popupImg");
        popupImg.src = imageSrc;
        popup.style.display = "flex";
      });
    });
  } catch (error) {
    console.error("Failed to load gallery images:", error);
  }
}

// Close popup logic
document.addEventListener("DOMContentLoaded", function () {
  loadGalleryImages();

  const popup = document.getElementById("imagePopup");
  const closeBtn = document.getElementById("closePopup");

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
