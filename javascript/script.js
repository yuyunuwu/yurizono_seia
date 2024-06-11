$(document).ready(function() {
    var $audio = $("#bg-audio");
    var $button = $("#sound-toggle");
    $audio[0].volume = 0.3;

    function toggleSound() {
        if ($audio[0].paused) {
            $audio[0].play();
            $button.text("暫停音樂");
        } else {
            $audio[0].pause();
            $button.text("播放音樂");
        }
    }

    function adjustVolume(value) {
        $audio[0].volume = value;
    }

    $button.on("click", toggleSound);

    $("#volume-slider").on("input", function() {
        adjustVolume($(this).val());
    });

    // 點擊任意位置時播放音樂並隱藏載入動畫
    $("#loading-overlay").on("click", function() {
        $audio[0].play().then(() => {
            $("#loading-overlay").fadeOut();
            $("#content").removeClass('show'); // 移除模糊效果
            $("#content").fadeIn();
            $button.text("暫停音樂");
        }).catch(error => {
            console.log("播放失敗: " + error);
        });
    });
});


$(document).ready(function() {
    $(document).click(function(event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        var $clickEffect = $("<div class='click-effect'></div>");
        $clickEffect.css({
            left: mouseX - 10 + "px", // 調整位置以保持在滑鼠點擊處中心
            top: mouseY - 180  + "px"   // 調整位置以確保出現在滑鼠點擊的正上方
        });

        $("#click-effect-container").append($clickEffect);

        $clickEffect.fadeOut(1000, function() {
            $(this).remove();
        });
    });
});

var previousX = null;
var previousY = null;
var spacing = 1; // 設定追蹤點之間的間距，數值越小越密集
var trailSize = 500; // 軌跡的最大尺寸，設置更大的值以使軌跡更長
var trailElements = [];

$(document).on("mousemove", function(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    if (previousX !== null && previousY !== null) {
        var distance = Math.sqrt(Math.pow(mouseX - previousX, 2) + Math.pow(mouseY - previousY, 2));
        var numPoints = Math.ceil(distance / spacing); // 根據間距計算應生成的點的數量
        var deltaX = (mouseX - previousX) / numPoints;
        var deltaY = (mouseY - previousY) / numPoints;

        for (var i = 0; i < numPoints; i++) {
            var x = previousX + i * deltaX;
            var y = previousY + i * deltaY;
            var $trail = $("<div class='mouse-trail'></div>");
            $trail.css({
                left: x + "px",
                top: y + "px",
            });
            $("body").append($trail);
            trailElements.push($trail);

            // 如果超出最大軌跡數量，則刪除最舊的軌跡
            if (trailElements.length > trailSize) {
                trailElements[0].remove();
                trailElements.shift();
            }

            // 設置軌跡消失的延遲時間，從軌跡最後一個元素開始
            var delay = 500 * (1 - i / numPoints); // 調整消失速度
            fadeTrail($trail, delay);
        }
    }

    previousX = mouseX;
    previousY = mouseY;
});

// 設置軌跡消失的函數
function fadeTrail($trail, delay) {
    setTimeout(function() {
        $trail.css("opacity", 0);
        setTimeout(function() {
            $trail.remove();
        }, 1000); // 調整消失時間
    }, delay);
}

function scrollToAboutMe() {
    var aboutMeSection = document.getElementById('about-me-wrapper');
    aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function like() {
    var aboutMeSection = document.getElementById('like');
    aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function no() {
    var aboutMeSection = document.getElementById('no');
    aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'start'});
}
function ok() {
    var aboutMeSection = document.getElementById('ok');
    aboutMeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


document.querySelector('.about-me-avatar').addEventListener('click', function() {
    var dialogBox = document.getElementById('dialog');
    dialogBox.classList.remove('hidden');

    var audio = document.getElementById("audio");
    audio.play();
    audio.volume = 1;

    var contents = [
        "混亂@@,是無法理解的行動,請不要戳我,會故障的"
    ]; // 定義你想要顯示的不同內容

    // 隨機選擇一個內容
    var randomContent = contents[Math.floor(Math.random() * contents.length)];

    // 將隨機選擇的內容設置到對話框中
    dialogBox.innerHTML = randomContent;

    setTimeout(function() {
        dialogBox.classList.add('hidden');
    }, 11000); // 4 秒後淡出
});

$(document).ready(function() {
    // 當鼠標移到文字上時，顯示提示文字
    $('.hover-text').mouseenter(function(event) {
      const rect = this.getBoundingClientRect();
      $('#tooltip').css({
        top: `${rect.bottom + window.scrollY}px`,
        display: 'block'
      });
    });
  
    // 當鼠標移開文字時，隱藏提示文字
    $('.hover-text').mouseleave(function() {
      $('#tooltip').css('display', 'none');
    });
  });









