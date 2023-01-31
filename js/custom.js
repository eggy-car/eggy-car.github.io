function logEventGame(id, type){
    analytics.logEvent(id, {
        type: type
    }); 

  }
function loadMainGame(){
    $('#preload').remove();
    $('.game-iframe-container').html('<iframe class="game-iframe" id="game-area" src="https://ubg77.github.io/edit/motoroadrash3d/" width="400" height="800" scrolling="none" frameborder="0" allowfullscreen=""></iframe>');
    logEventGame("road-rash-3d", "play");
    
}
function loadGame(slug){
    fetch("game/all.json",{
        headers: {
            'Content-Type': 'application/json',
            },
    }).then(response => response.json())
    .then(data => {
        listGame = data;
        for (var j=0; j<listGame.length; j++) {
            if (listGame[j].slug == slug) {
                var tmp_url = '';
                if(listGame[j].domain == 1){
                    tmp_url = 'https://webglmath.github.io/'+slug+"/";
                } else if(listGame[j].domain == 2){
                    tmp_url = 'https://ubg77.github.io/edit/'+slug+"/";
                }  else if(listGame[j].domain == 3){
                    tmp_url = 'https://ubg77.github.io/game131022/'+slug+"/";
                    
                }  else if(listGame[j].domain == 4){
                    tmp_url = 'https://ubg77.github.io/fix/'+slug+"/";
                    if(slug.indexOf("fnaf2") != -1){
                        tmp_url = 'https://ubg77.github.io/fix/'+slug;
                    }
                }
                $('#gameframe').src = tmp_url;
                $("html, body").animate({ scrollTop: 0 }, "slow");
                break;
            }
        }
    });
}
var search = window.location.search;
if(search){
    loadGame(search.replace('?class=',''));
    //addAdsClass();
}
function open_fullscreen() {
	let game = document.getElementById("gameframe");
	if (game.requestFullscreen) {
	  game.requestFullscreen();
	} else if (game.mozRequestFullScreen) { /* Firefox */
	  game.mozRequestFullScreen();
	} else if (game.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	  game.webkitRequestFullscreen();
	} else if (game.msRequestFullscreen) { /* IE/Edge */
	  game.msRequestFullscreen();
	}
};
function showGame(slug){
    for (var j=0; j<listGame.length; j++) {
        if (listGame[j].slug == slug) {
            var tmp_url = '';
            if(listGame[j].domain == 1){
                tmp_url = 'https://webglmath.github.io/'+slug+"/";
            } else if(listGame[j].domain == 2){
                tmp_url = 'https://ubg77.github.io/edit/'+slug+"/";
            }  else if(listGame[j].domain == 3){
                tmp_url = 'https://ubg77.github.io/game131022/'+slug+"/";
                
            }  else if(listGame[j].domain == 4){
                tmp_url = 'https://ubg77.github.io/fix/'+slug+"/";
                if(slug.indexOf("fnaf2") != -1){
                    tmp_url = 'https://ubg77.github.io/fix/'+slug;
                }
            }
            logEventGame(slug, "play");
            $('#preload').remove();
            $('.game-iframe-container').html('<iframe class="game-iframe" id="game-area" src="'+tmp_url+'" width="400" height="800" scrolling="none" frameborder="0" allowfullscreen=""></iframe>');
            $("#title").html(listGame[j].title);
            $("html, body").animate({ scrollTop: 0 }, "slow");
            break;
            
        }
    }
}
var listGame;
fetch("game/all.json",{
headers: {
    'Content-Type': 'application/json',
    },
}).then(response => response.json())
.then(data => {
    listGame = data;
});
function searchGame(){
    var x = document.getElementById("searchInput").value;
    console.log(x);
    let html = "";
    document.getElementById('listgame').innerHTML = '';
    for (var j=0; j<listGame.length; j++) {
        if (listGame[j].title.toUpperCase().indexOf(x.toUpperCase()) >= 0) {
            var item = listGame[j];
            var img = item.slug;
            if(item.img){
                img = item.img;
            }
            var slug = item.slug;
                if(slug.indexOf("fnaf2") != -1 && listGame[j].domain == 4){
                   slug = listGame[j].slug_tmp;
                } 
            const htmlItem = `<div class="g-card">
                    <div class="pic">
                    <figure class="ratio ratio-1">
                        <a rel="noindex nofollow" title="${item.title}" onclick="showGame('${item.slug}')">
                        <img src="https://tbg95.co/${item.slug}/logo.png" class="small-thumb" alt="${item.title}">
                        </a>
                    </figure>
                    </div>
                    <div class="g-info">
                    <h3 class="grid-title ellipsis">
                        <a title="${item.title}" rel="noindex nofollow">${item.title}</a>
                    </h3>
        
                    <a class="bt-play" rel="noindex nofollow" title="${item.title}">
                        <img src="/images/play.svg" alt="Play game">
                    </a>
                    </div>
                </div>`;
            const e = document.createElement('div');
            e.className  = "column is-2-widescreen is-3-desktop is-4-tablet is-6-mobile show";
            e.innerHTML = htmlItem;  
            document.getElementById('listgame').appendChild(e);
        }
    }
    
}
function loadSimilar(){
    fetch("game/similar.json",{
        headers: {
            'Content-Type': 'application/json',
            },
    }).then(response => response.json())
    .then(data => {
        listGame = data;
        for (var j=0; j<listGame.length; j++) {
            var item = listGame[j];
            var img = item.slug;
            if(item.img){
                img = item.img;
            }
            const htmlItem = `<a rel="noindex nofollow" title="${item.title}" onclick="showGame('${item.slug}')">
                        <div class="pic">
                            <figure class="ratio ratio-1 circle list-thumbnail">
                            <img src="/images/logo/${img}.png" class="small-thumb" alt="${item.title}">
                            </figure>
                        </div>
                        <div class="text">
                            <h3>
                            <div class="list-title ellipsis">${item.title}</div>
                            </h3>
                            <div class="sub-text ellipsis">Car games</div>
                        </div>
                        </a>`;
            const e = document.createElement('li');
            e.className  = "widget-list-item";
            e.innerHTML = htmlItem;  
            document.getElementById('similar').appendChild(e);
            
        }
    });
}
function loadHot(){
    fetch("game/hot.json",{
        headers: {
            'Content-Type': 'application/json',
            },
    }).then(response => response.json())
    .then(data => {
        listGame = data;
        for (var j=0; j<listGame.length; j++) {
            var item = listGame[j];
            var img = item.slug;
            if(item.img){
                img = item.img;
            }
            var slug = item.slug;
            if(slug.indexOf("fnaf2") != -1 && listGame[j].domain == 4){
                slug = listGame[j].slug_tmp;
            } 
            const htmlItem = `<a rel="noindex nofollow" title="${item.title}" onclick="showGame('${item.slug}')">
                        <div class="pic">
                            <figure class="ratio ratio-1 circle list-thumbnail">
                            <img src="/images/logo/${img}.png" class="small-thumb" alt="${item.title}">
                            </figure>
                        </div>
                        <div class="text">
                            <h3>
                            <div class="list-title ellipsis">${item.title}</div>
                            </h3>
                            <div class="sub-text ellipsis">Hot</div>
                        </div>
                        </a>`;
            const e = document.createElement('li');
            e.className  = "widget-list-item";
            e.innerHTML = htmlItem;  
            document.getElementById('hotgame').appendChild(e);
            
        }
    });
}
function loadAllGame(){
    fetch("game/all.json",{
        headers: {
            'Content-Type': 'application/json',
            },
        }).then(response => response.json())
    .then(data => {
        listGame = data;
        for (var j=listGame.length-1; j>=0; j--) {
            var item = listGame[j];
            var img = "/images/logo/"+item.slug;
            if(item.img){
                img = "/images/logo/"+item.img;
            }
            var slug = item.slug;
            if(slug.indexOf("fnaf2") != -1 && listGame[j].domain == 4){
                slug = listGame[j].slug_tmp;
            }
            if(item.domain == 8){
                img = "https://ubg77.github.io/updatefaqs/"+item.slug+"/logo";
            }
            const htmlItem = `
            <div
              class="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 block rounded-[1.25rem] border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg"
            >
              <figure class="relative">
                <a title="${item.title}" href="/detail/${slug}.html" style="cursor:pointer">
                  <img
                    src="${img}.png"
                    alt="${item.title}"
                    class="w-full rounded-[0.625rem]"
                    loading="lazy" style="height:230px"
                  />
                </a>
                <div
                  class="dark:bg-jacarta-700 absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2"
                >
                  <span
                    class="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                    data-tippy-content="Favorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      class="dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red h-4 w-4"
                    >
                      <path fill="none" d="M0 0H24V24H0z" />
                      <path
                        d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                      />
                    </svg>
                  </span>
                  <span class="dark:text-jacarta-200 text-sm">${(j+1995)*2 - (1234 -  Math.floor(Math.random() * j))  + Math.floor(Math.random() * 11)}</span>
                </div>
                
              </figure>
              <div class="mt-7 flex items-center justify-between">
                <a title="${item.title}"  href="/detail/${slug}.html" style="cursor:pointer">
                  <span class="font-display text-jacarta-700 hover:text-accent text-base dark:text-white"
                    >${item.title}</span
                  >
                </a>
              </div>
        
            </div>
          `;
            const e = document.createElement('article');
            e.innerHTML = htmlItem;  
            document.getElementById('listgame').appendChild(e);
        }
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
function loadCategory(cat){
    var tmp_cat = capitalizeFirstLetter(cat);
    fetch("game/all.json",{
        headers: {
            'Content-Type': 'application/json',
            },
    }).then(response => response.json())
    .then(data => {
        listGame = data;
        document.getElementById('listgame').innerHTML = '';
        logEventGame(cat, "searchCat");
        for (var j=listGame.length; j>0; j--) {
            if (listGame[j].cat.indexOf(tmp_cat) >= 0) {
            var item = listGame[j];
            var img = item.slug;
            if(item.img){
                img = item.img;
            }
            const htmlItem = `<div class="g-card">
                    <div class="pic">
                    <figure class="ratio ratio-1">
                        <a rel="noindex nofollow" title="${item.title}" onclick="showGame('${item.slug}')">
                        <img src="/images/logo/${img}.png" class="small-thumb" alt="${item.title}">
                        </a>
                    </figure>
                    </div>
                    <div class="g-info">
                    <h3 class="grid-title ellipsis">
                        <a rel="noindex nofollow" title="${item.title}">${item.title}</a>
                    </h3>
                    <div class="info">
                        <div class="rating ellipsis">
                            ${item.cat}
                        </div>
                    </div>
                    <a class="bt-play" title="${item.title}" rel="noindex nofollow" onclick="showGame('${item.slug}')">
                        <img src="/images/play.svg" alt="Play game">
                    </a>
                    </div>
                </div>`;
            const e = document.createElement('div');
            e.className  = "column is-2-widescreen is-3-desktop is-4-tablet is-6-mobile show";
            e.innerHTML = htmlItem;  
            document.getElementById('listgame').appendChild(e);
            }
            
        }
        document.getElementById('listgame').scrollIntoView();
    });

}
window.addEventListener('load', function() {
    
    // loadSimilar();
    // loadHot();
    loadAllGame();
});
