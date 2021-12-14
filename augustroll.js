const app = {
    initialize: () => {
        app.client = contentful.createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: "cn3xgzgcq8oa",
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: "LpEhsQxb5ZjgaOuT_vEuE0ux-p8ntCNBiyIGiJxf8KA"
        });
    },

    // fetch a particular project
    getEntry: entry => {
        // a known issue with the contentful library is that embedded images are ignored in rich text
        // this is the current workaround: https://github.com/contentful/rich-text/issues/61
        const options = {
            renderNode: {
                'embedded-asset-block': ({ data: { target: { fields } } }) => {
                    return `<img src="${fields.file.url}" height="${fields.file.details.Row1.height}" width="${fields.file.details.Row1.width}" alt="${fields.description}"/>`;
                }
            }
        };

        app.client.getEntry(entry).then(project => {
            debugger;
            const projectData = {
                title: project.fields.projectTitle,
                imageUrl: `http:${project.fields.Row1.fields.file.url}`,
                imageTitle: project.fields.Row1.fields.title,
            };
            // load the template for this item from a local file
            fetch('roll.mustache')
                .then(response => response.text())
                .then(template => {
                    // render the template with the data
                    const rendered = Mustache.render(template, projectData);
                    // add the element to the container
                    $('.container').append(rendered);
                });
        });
    },

    getAllEntries: async() => {
        // first make sure we have our template loaded
        // i can use the word await along with async to pause the program until this function is finished
        const template = await app.loadTemplateRoll();
        // fetch all entries
        app.client.getEntries().then(response => {
            // go through each one
            response.items.forEach(project => {
                // pull out the data you're interested in
                debugger;
                const projectData = {
                    title: project.fields.projectTitle,
                    imageUrl: `http:${project.fields.Row1.fields.file.url}`,
                    imageTitle: project.fields.Row1.fields.title,
                    description: project.fields.projectDescription,
                    slug: `${project.fields.slug}.html`
                };
                const rendered = Mustache.render(template, projectData);
                // add the element to the container
                $('.container').append(rendered);
            });
        });
    },

    getEntriesByTag: async tag => {
        // first make sure we have our template loaded
        // i can use the word await along with async to pause the program until this function is finished
        const template = await app.loadTemplateRoll();
        // fetch entries with a specfic tag
        app.client.getEntries({ 'metadata.tags.sys.id[in]': tag }).then(response => {
            // go through each one
            response.items.forEach(project => {
                // pull out the data you're interested in
                const projectData = {
                    title: project.fields.title,
                    imageUrl: `http:${project.fields.Row1.fields.file.url}`,
                    imageTitle: project.fields.Row1.fields.title,
                    description: project.fields.projectDescription,
                    slug: `${project.fields.slug}.html`
                };
                const rendered = Mustache.render(template, projectData);
                // add the element to the container
                $('.container').append(rendered);
            });
        });
    },

    loadTemplateRoll: () => fetch('roll.mustache').then(response => response.text()).then(template => template)

};

// modal image

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("media");
var modalImg = document.getElementById("media");
img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}