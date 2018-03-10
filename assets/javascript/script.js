(function () {

    //lazy load
    //flex box
    let api = 'Kf9nuUBpJ1WYMe66AzBk2BAbIgtF4OxQ';
    let searchTerm = "";
    let queryURL = "";
    let currentBtns = [];
    let play = false;

    function addGifs(term) {
        event.preventDefault();

        searchTerm = ""

        if (term) {
            searchTerm = term.text();
        } else {
            searchTerm = $('.search-term').val().trim();
        }

        if (searchTerm !== "") {

            searchTerm = searchTerm.toLowerCase();

            queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + api + "&limit=10";

            $.get(queryURL).then(function (response) {

                console.log(response)

                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].rating !== 'r' || response.data[i].rating !== 'pg-13') {

                        //get gifs and append to page
                        let imgSrc = response.data[i].images.fixed_width_still.url;

                        let gifDiv = $('<div class="item">');

                        let className = searchTerm.replace(/\s+/g, '-')
                            .toLowerCase();

                        gifDiv.addClass('item')
                            .addClass('gif-search-' + className);


                        let newGif = $('<img>');

                        newGif.addClass('gif')
                            .attr('src', imgSrc)
                            .attr('alt', 'a wonderful gif')
                            .attr('data-state', 'still')
                            .attr('data-still', imgSrc)
                            .attr('data-animate', response.data[i].images.fixed_width.url);

                        gifDiv.prepend(newGif);

                        $('.gif-results').prepend(gifDiv);
                    }
                }

                //add btns 
                let newBtn = $('<button>');

                newBtn.text(searchTerm).addClass('new-btn btn btn-outline-secondary btn-lg');

                $('.add-btn').prepend(newBtn);

                currentBtns.push(searchTerm);

                console.log(searchTerm)

                //here add enter, add function to search $(this) of .add-btn on click, first settop to div then append and lazyload, only have 10 buttons, two rows?
            });
        }
    }

    function playGif() {
        let state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));

            $(this).attr('data-state', 'animate');

            state = 'animate';
        } else if (state === 'animate') {

            $(this).attr('src', $(this).attr('data-still'));

            $(this).attr('data-state', 'still');
        } else {};
    }

    $('.add-btn').click(function () {

        addGifs($(this));

        $('.search-term').val("");
        if (currentBtns.indexOf(searchTerm) === -1) {} else {
            $('.gif-results').remove(searchTerm);
        }
    })

    $('.search-term').keypress(function (event) {

        if (event.which == 13) {

            addGifs();

            $('.search-term').val("");

            return false;
        }
    });

    $('.search-btn').click(function () {

        addGifs();

        $('.search-term').val("");
    })

    $(document).on("click", ".gif", playGif);

})();