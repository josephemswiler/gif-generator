(function () {

    let topics = ['Seinfeld', 'The Simpsons', 'Game of Thrones', 'Silicon Valley', 'Parks and Recreation', 'The Office'];
    let api = 'Kf9nuUBpJ1WYMe66AzBk2BAbIgtF4OxQ';
    let searchTerm = "";
    let queryURL = "";
    let currentBtns = [];
    let play = false;
    let divArr = [];

    function addGifs(term) {

        $('.instructions').css('display', 'none');

        $('.gif-results').empty();

        searchTerm = term;

        if (event) {

            event.preventDefault();
        }

        if (searchTerm !== "") {

            searchTerm = searchTerm.toLowerCase();

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + api + "&limit=10";

            $.get(queryURL).then(function (response) {

                divArr = [];

                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].rating !== 'r' || response.data[i].rating !== 'pg-13') {

                        //get gifs and append to page
                        let imgSrc = response.data[i].images.fixed_width_still.url;

                        let gifDiv = $('<div>');

                        gifDiv.addClass('item')
                            .addClass('card')
                            .css('opacity', 0)

                        let newGif = $('<img>');

                        newGif.addClass('gif')
                            .attr('src', imgSrc)
                            .attr('alt', 'a wonderful gif')
                            .attr('data-state', 'still')
                            .attr('data-still', imgSrc)
                            .attr('data-animate', response.data[i].images.fixed_width.url);

                        let textDiv = $('<div>');

                        let p = $('<button>')
                            .addClass('rating btn btn-outline-secondary btn-sm')
                            .prop('disabled', true)
                            .text("Rating: " + response.data[i].rating.toUpperCase());

                        let a = $('<span>')
                            .addClass('fas fa-play');

                        let b = $('<button>')
                            .addClass('btn btn-outline-secondary btn-sm')
                            .prop('disabled', true)
                            .append(a);

                        textDiv.addClass('text-div')
                            .append(p)
                            .append(b);

                        gifDiv.prepend(newGif)
                            .append(textDiv);

                        divArr.push(gifDiv);

                        $('.gif-results').append(gifDiv);

                        lazyLoad();
                    };
                };
            });
        };
    };


    function lazyLoad() {
        for (var k = 0; k < divArr.length; k++) {

            loader(k);
        }
    };

    function loader(k) {
        setTimeout(function () {

            divArr[k].animate({
                opacity: 1
            });
        }, k * 50);
    };

    function makeBtn(text) {

        if (currentBtns.includes(text)) {

            $('.search-term').val("");

            return;
        }

        let newBtn = $('<button>');

        newBtn.text(text).addClass('new-btn btn btn-outline-secondary btn-lg');

        $('.add-btn').prepend(newBtn);

        currentBtns.push(text);

        $('.search-term').val("");
    };

    function playGif() {

        let state = $(this).attr('data-state');

        if (state === 'still') {

            $(this).attr('src', $(this).attr('data-animate'));

            $(this).attr('data-state', 'animate');

            $(this).parent().css("background-color", "#7bed9f");

            $(this).parent().find('svg').removeClass('fa-play').addClass('fa-pause');

            state = 'animate';
        } else if (state === 'animate') {

            $(this).attr('src', $(this).attr('data-still'));

            $(this).attr('data-state', 'still');

            $(this).parent().css("background-color", "");

            $(this).parent().find('svg').removeClass('fa-pause').addClass('fa-play');

            state = 'still';
        } else {};
    };

    $('.new-btn').click(function () {

        if (currentBtns.indexOf(searchTerm) === -1) {} else { //here
            $('.gif-results').remove(searchTerm);
        }
    });

    $('.search-term').keypress(function (event) {

        if (event.which == 13 && $('.search-term').val().trim() !== "") {

            addGifs($(this).val().trim());

            makeBtn($(this).val().trim());

            return false;
        }
    });

    $('.search-btn').click(function () {

        if ($('.search-term').val().trim() === "") {
            return;
        }
        addGifs($('.search-term').val().trim());

        makeBtn($('.search-term').val().trim());
    });

    function starterBtns() {
        for (var j = 0; j < topics.length; j++) {
            makeBtn(topics[j]);
        }
    };

    $(document).on("click", ".gif", playGif);

    $(document).on("click", ".new-btn", function () {

        addGifs($(this).text());
    });

    starterBtns();
})();