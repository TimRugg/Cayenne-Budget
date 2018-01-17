
$.getJSON(
        "http://www.reddit.com/r/deals.json",
        function getDeals(data)
        {
          $.each(
            data.data.children.slice(0, 6),
            function (i, post) {
              $("#veiwDeals").append( '<br><span class="deal-title">' + post.data.title + '</span>');
              // $("#veiwDeals").append( '<br>' + post.data.domain );
              $("#veiwDeals").append( '<br><a href="' + post.data.url +'" class="deal-link">' + post.data.domain + '</a>' );
              $("#veiwDeals").append( '<hr class="deal-hr">' );

            }
          )
        }
      )
