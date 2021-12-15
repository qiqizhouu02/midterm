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
                    return `<img src="${fields.file.url}" height="${fields.height}" width="${fields.width}" alt="${fields.description}"/>`;
                }
            }
        };

        app.client.getEntry(entry).then(project => {
            debugger;
            const projectData = {
                title: project.fields.pageTitle,
                images: project.fields.row1,
                images2: project.fields.row2,
                images3: project.fields.row3,

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

    loadTemplateRoll: () => fetch('roll.mustache').then(response => response.text()).then(template => template)

};

// now trying to do the modal image thing

const images = document.querySelectorAll('.pics');
images.forEach(image => {
    image.addEventListener('click', e => {
        debugger;
        modalImg.src = e.currentTarget.src
    })

    fetch('roll.mustache')
        .then(response => response.text())
        .then(template => {
            // render the template with the data
            const rendered = Mustache.render(template, projectData);
            // add the element to the container
            $('.container').append(rendered);
        });
})