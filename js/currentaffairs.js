const BASE_IMAGE_URL = "https://gallery.giaonline.org/api/image/";

async function loadGalleryImages() {
  const API_URL =
    "https://gallery.giaonline.org/api/gallery/by-category?category=current_affairs";

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

      col.innerHTML = `
                      <div class="card h-100 shadow-sm">
                        <img 
                          src="${BASE_IMAGE_URL + item.image}" 
                          class="card-img-top popup-image img-fluid"
                          alt="Gallery Image"                          
                          style="object-fit: cover; height: 250px;"
                        />
                      </div>
                    `;

      galleryContainer.appendChild(col);
    });
  } catch (error) {
    console.error("Failed to load gallery images:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadGalleryImages);
