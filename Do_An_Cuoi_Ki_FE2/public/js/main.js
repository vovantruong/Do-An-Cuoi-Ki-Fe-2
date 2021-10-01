//Sự kiện trước khi load trang.
// window.onbeforeunload = function () {
//   return (
//     "Any string value here forces a dialog box to \n" +
//     "appear before closing the window."
//   );
// };

document.querySelector(".wrapper-game").style.display = "none";
document.querySelector(".bonuss_gif").style.display = "none";
document.querySelector(".setting").style.display = "none";
document.querySelector(".bg-setting").style.display = "none";
// Kết thúc chào người chơi
const end__finish = document.querySelector(".end__finish");

//Sau khi kết thúc màn chào hỏi người chơi sẽ cho chương trình game chạy
end__finish.addEventListener("click", () => {
  let hello__name__player = document.querySelector(".hello__name__player");
  hello__name__player.style.display = "none";
  document.querySelector(".wrapper-game").style.display = "block";
  document.querySelector(".bonuss_gif").style.display = "block";

  document.querySelector(
    ".start-sound"
  ).innerHTML = `<audio autoplay controls hidden> 
    <source src="./public/img/audio/star-game.wav" type="audio/mpeg">
    </audio>`;

  //Gọi đến hàm maine của game
  main__game();
  //Gọi đén hàm set bonus
  bonus_gif();

  //Gọi đến hàm main sound
  document.querySelector(".setting").style.display = "block";
  document.querySelector(".bg-setting").style.display = "block";
  Sound_Main();

  //Gọi đến Hàm Change background
  ChangeBG();
});

// Hiển thị tên người chơi
const get__name__player = document.querySelector(".startAfterSaveName");

get__name__player.addEventListener("click", () => {
  let instructor__name = document.querySelector(".instructor__name");
  let name__title = document.querySelector(".name__title");
  let name__player = document.querySelector(".name__player");
  let img__instructor = document.querySelector(".img__instructor");
  let error__name = document.querySelector(".error__name");

  document.querySelector(
    ".start-sound"
  ).innerHTML = `<audio autoplay controls hidden> 
    <source src="./public/img/audio/star-game.wav" type="audio/mpeg">
    </audio>`;

  //Ten nguoi choi tren thanh menu
  let name__player__header = document.querySelector(".name__player__header");

  if (name__player.value === "") {
    error__name.style.display = "block";
    document.querySelector(
      ".start-sound"
    ).innerHTML = `<audio autoplay controls hidden> 
        <source src="./public/img/audio/wrong.wav" type="audio/mpeg">
        </audio>`;
    error__name.classList.add("rung-error");
  } else {
    name__title.innerHTML = name__player.value;
    instructor__name.style.display = "block";
    img__instructor.style.display = "block";
    //add data-dismiss cho thẻ modal bằng Jquery
    $("button.startAfterSaveName").attr("data-dismiss", "modal");
    //Bắt đầu các trạng thái của game sau khi lưu tên
  }

  name__player__header.innerHTML = name__player.value;
});

function startGame() {
  // Xử lí hiển thị thông báo chào người chơi
  // Ẩn hiện massage
  const finish__massage = document.querySelector(".finish__massage");
  finish__massage.addEventListener("click", () => {
    let title__instructor = document.querySelector(".title__instructor");
    let img__instructor = document.querySelector(".img__instructor");
    document.querySelector(
      ".start-sound"
    ).innerHTML = `<audio autoplay controls hidden> 
        <source src="./public/img/audio/star-game.wav" type="audio/mpeg">
        </audio>`;

    title__instructor.style.display = "none";
    img__instructor.style.display = "none";
  });
  // Close massage
  document.querySelector(".close").addEventListener("click", () => {
    let title__instructor = document.querySelector(".title__instructor");
    let img__instructor = document.querySelector(".img__instructor");

    title__instructor.style.display = "block";
    img__instructor.style.display = "block";
  });
  //Bắt sự kiện khi người dùng nhấn key code
  document.addEventListener("keydown", (key) => {
    let title__instructor = document.querySelector(".title__instructor");
    let img__instructor = document.querySelector(".img__instructor");
    if (key.keyCode === 27) {
      title__instructor.style.display = "block";
      img__instructor.style.display = "block";
    }
  });
}

startGame();

// Main game
const main__game = function () {
  //Variables
  //Số liệu thống kê của thú cưng là sức khỏe, vitamin M và vitamin R
  var ctMaxH = 108, //120
    ctMaxVM = 75, //75
    ctMaxVR = 75, //75
    ctCurH = ctMaxH,
    ctCurVM = ctMaxVM,
    ctCurVR = ctMaxVR,
    intervalH = 1000, //Khoảng thời gian của thanh máu
    intervalVM = 2000, //Khoảng thời gian của thanh vitamin M
    intervalVR = 3000, //Khoảng thời gian của thanh vitamin R
    //Khi vitamin giảm xuống dưới ngưỡng, vật nuôi bắt đầu suy giảm sức khỏe
    threshold = ctMaxH * 2.8,
    points = 2,
    widther = 4,
    //Khi các điều kiện nguy hiểm, các thanh trạng thái bị ảnh hưởng sẽ được đánh dấu màu đỏ
    alive = true,
    dangerH = false,
    dangerVM = false,
    dangerVR = false,
    //Nhận mét để thay đổi chiều rộng và màu đường viền
    getMtrH = document.getElementById("blool__bar"),
    getMtrVM = document.getElementById("food__bar"),
    getMtrVR = document.getElementById("status__bar"),
    getStyleH = getMtrH.style,
    getStyleVM = getMtrVM.style,
    getStyleVR = getMtrVR.style,
    //Nhận các nút cho các sự kiện nhấp chuột
    getBtnf1 = document.getElementById("box__food__1"),
    getBtnf2 = document.getElementById("box__food__2");
  getBtnf3 = document.getElementById("box__food__3");
  getBtnf4 = document.getElementById("box__food__4");
  getBtnPet = document.getElementById("img__main");
  //lấy thức ăn thú cưng
  getFood_1 = document.getElementById("food__1");
  getFood_2 = document.getElementById("food__2");
  getFood_3 = document.getElementById("food__3");
  getFood_4 = document.getElementById("food__4");

  //Nhận các nút cho sự kiên nhấp chuột trong đồ chơi
  (getBtnToy1 = document.getElementById("box__toys__1")),
    (getBtnToy2 = document.getElementById("box__toys__2"));
  getBtnToy3 = document.getElementById("box__toys__3");
  getBtnToy4 = document.getElementById("box__toys__4");
  //lấy đồ chơi thú cưng
  getToys_1 = document.getElementById("toys__1");
  getToys_2 = document.getElementById("toys__2");
  getToys_3 = document.getElementById("toys__3");
  getToys_4 = document.getElementById("toys__4");

  //nhận dữ liệu thông báo thú cưng đã chết
  getTB = document.querySelector(".notification-pet");
  //lấy dữ liệu hàm đếm ngược thời gian 5s để thưởng tiền
  countdown = document.querySelector(".count-down");
  //lấy dữ liệu thanh cảm xúc và thanh thức ăn để chia 1 nửa
  half_blool = document.querySelector(".half-blool");
  half_food = document.querySelector(".half-food");
  //lấy dữ liệu thông báo game kêt thúc
  message_game = document.querySelector(".end__game__massage");
  //lấy dữ liệu âm thanh cho ăn
  feeding_sound = document.querySelector(".feeding-sound");
  //lấy dữ liệu âm thanh vuốt ve mèo
  caressing_sound = document.querySelector(".caressing-sound");

  //lây thông báo thú cưng đò ăn
  let massage__pet__hungry = document.querySelector(
    ".massage__pet__hungry"
  ).style;
  function half() {
    half_blool.style.position = "absolute";
    half_blool.style.left = "50%";
    half_blool.innerHTML = "|";
    half_food.style.position = "absolute";
    half_food.style.left = "35%";
    half_food.innerHTML = "I";
    half_food.style.marginTop = "-5px";
  }

  // percent.style.borderRight = '5px solid black';

  //Get style for the feedback div
  //Tạo phong cách cho div phản hồi
  //       getStyleFb = 	document.getElementById('feedback').style;

  //  getStyleFb.display = 'none';
  meterWidth();
  //Trong khoảng thời gian nhất định, vitamin H giảm.
  setInterval(function () {
    if (alive == true) {
      loseH();
      checkDangerH();
      half();
      if (ctMaxVM * 0.5 > ctCurVM) {
        //kiểm tra thanh đồ ăn dưới 50%
        massage__pet__hungry.display = "block"; //thông báo thú cưng đòi ăn
      } else {
        massage__pet__hungry.display = "none";
      }
    }
  }, intervalH);
  //Trong khoảng thời gian nhất định, vitamin M giảm.
  setInterval(function () {
    if (alive == true) {
      loseVM();
      checkDangerVM();
    }
    //  loseVM();
    //          checkDangerVM();
  }, intervalVM);

  //Trong khoảng thời gian nhất định, vitamin R giảm.
  setInterval(function () {
    if (alive == true) {
      loseVR();
      checkDangerVR();
    }
    //  loseVR();
    //  checkDangerVR();
  }, intervalVR);

  /*
    Điều gì xảy ra trong cái tổ này:
     Sức khỏe bắt đầu giảm nếu vitamin M hoặc vitamin R quá thấp.
     Đồ họa đồng hồ được điều chỉnh nếu có.
     Nếu vật nuôi đã chết, thì các sự kiện kết thúc sẽ kích hoạt.
    */
  setInterval(function () {
    meterWidth();
    checkDangerH();

    //Điều chỉnh đồ họa
    if (dangerH == true) {
      //warnH();
      loseH();
    }

    //When your pet runs out of health, it will be a gonner.

    //Khi thú cưng của bạn cạn kiệt sức khỏe, nó sẽ chết.
    if (ctCurH < 0 || ctCurVM < 0) {
      alive = false;
      //thiết lập thời gian thông báo sau khi thú cưng chết
      setTimeout(() => {
        toastLiveExample.style.display = "block";
        //getBtnPet.style.background = 'none';
        getStyleH.width = 0 + "px";
        getStyleVM.width = 0 + "px";
        getStyleVR.width = 0 + "px";

        // hiển thị thông báo game over
        let end__temp = document.querySelector(".end__temp").style;

        //Ẩn setting khi gameover
        document.querySelector(".setting").style.display = "none";
        document.querySelector(".bg-setting").style.display = "none";

        end__temp.height = "100vh";
        end__temp.background = "rgba(0, 0, 0, 0.849)";
        var toast = new bootstrap.Toast(toastLiveExample);
        document.querySelector(".over-sound").classList.add("sound");
        toast.show();
        document.querySelector(".wrapper-game").style.display = "none";
        document.querySelector(".bonuss_gif").style.display = "none";
      }, 1000);
    }
  }, intervalH);

  //Nhấp vào "vật nuôi" sẽ phục hồi sức khỏe cho thú cưng của bạn.
  getBtnPet.addEventListener("click", function () {
    if (alive == true) {
      if (ctCurH + points <= ctMaxH) {
        ctCurH = ctCurH + points;
        caressing_sound.innerHTML = `<audio autoplay controls hidden> 
                <source src="./public/img/audio/cat-meow.wav" type="audio/mpeg">
            </audio>`;
        meterWidth();

        //Kiểm tra các điều kiện và điều chỉnh đồ họa khi thích hợp.
        checkDangerH();
        checkDangerVM();
        checkDangerVR();
      }
    }
  });

  //bắt sự kiên thêm thông báo
  let massage__food = document.querySelector(".massage__food");
  let shop__pet = document.querySelector(".shop__pet");
  shop__pet.addEventListener("click", () => {
    massage__food.style.transform = "scale(0)";
  });

  //Nhấp vào nút "Cho ăn" sẽ phục hồi vitamin và sức khỏe cho thú cưng của bạn.
  getBtnf1.addEventListener("click", function () {
    if (getFood_1.innerHTML > 0) {
      feeding(3);
      getFood_1.innerHTML = getFood_1.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnf2.addEventListener("click", function () {
    if (getFood_2.innerHTML > 0) {
      feeding(5);
      getFood_2.innerHTML = getFood_2.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnf3.addEventListener("click", function () {
    if (getFood_3.innerHTML > 0) {
      feeding(8);
      getFood_3.innerHTML = getFood_3.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnf4.addEventListener("click", function () {
    if (getFood_4.innerHTML > 0) {
      feeding(10);
      getFood_4.innerHTML = getFood_4.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });

  //Nhấp vào nút Đồ chơi sẽ phục hồi thanh trang thái đồ chơi

  getBtnToy1.addEventListener("click", function () {
    if (getToys_1.innerHTML > 0) {
      toyding(4);
      getToys_1.innerHTML = getToys_1.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
      audio_toy();
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnToy2.addEventListener("click", function () {
    if (getToys_2.innerHTML > 0) {
      toyding(7);
      getToys_2.innerHTML = getToys_2.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
      audio_toy();
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnToy3.addEventListener("click", function () {
    if (getToys_3.innerHTML > 0) {
      toyding(10);
      getToys_3.innerHTML = getToys_3.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
      audio_toy();
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  getBtnToy4.addEventListener("click", function () {
    if (getToys_4.innerHTML > 0) {
      toyding(14);
      getToys_4.innerHTML = getToys_4.innerHTML - 1;
      massage__food.style.transform = "scale(0)";
      audio_toy();
    } else {
      massage__food.style.transform = "scale(1)";
    }
  });
  //kiểm tra thanh sinh mệnh của thú cưng luôn đầy trong 5s sẽ được thưởng điểm
  var second_5s = 0;
  setInterval(function () {
    console.log(ctCurH + "nn");
    console.log(ctMaxH + "max");
    if (ctCurH + 1 * 2 == ctMaxH) {
      second_5s++;
      getTB.innerHTML = second_5s;
      if (second_5s == 5) {
        bonus(1000); //gọi hàm thưởng 1000 khi người chơi đạt điểm cảm xúc tối đa 5s
        second_5s = 0;
        countdown.innerHTML = "+1000";
      } else if (second_5s < 5) {
        countdown.innerHTML = "";
      }
    } else {
      second_5s = 0;
      getTB.innerHTML = "";
    }
  }, 1000);

  //hàm cho thú cưng ăn
  function feeding(element) {
    if (alive == true) {
      feeding_sound.innerHTML = `<audio autoplay controls hidden> 
                        <source src="./public/img/audio/eat.mp3" type="audio/mpeg">
                    </audio>`;
      if (ctCurH + points < ctMaxH) {
        if (ctMaxVM * 0.5 < ctCurVM) {
          ctCurH = ctCurH + element;
        }
        meterWidth();
        //Kiểm tra các điều kiện và điều chỉnh đồ họa khi thích hợp.
        checkDangerH();
        checkDangerVM();
        checkDangerVR();
      }
      if (ctCurVM + points <= ctMaxVM) {
        ctCurVM = ctCurVM + element;

        if (ctMaxVM * 0.5 < ctCurVM) {
          bonus(500); //người chơi cho thú cưng ăn đúng giờ sẽ được thưởng tiền
        }
      }
    }
  }

  // Bắt sự kiện khi ấn vào nút cho chơi đồ chơi
  function toyding(element) {
    if (alive == true) {
      if (ctCurVR + points < ctMaxVR) {
        ctCurVR = ctCurVR + element;

        if (ctCurH + points < ctMaxH) {
          ctCurH = ctCurH + element;
        }

        meterWidth();

        //Kiểm tra các điều kiện và điều chỉnh đồ họa khi thích hợp.
        checkDangerH();
        checkDangerVM();
        checkDangerVR();
      }
    }
  }

  const audio_toy = function () {
    feeding_sound.innerHTML = `<audio autoplay controls hidden> 
        <source src="./public/img/audio/toys.mp3" type="audio/mpeg">
        </audio>`;
  };

  //Functions

  function meterWidth() {
    //Điều này cập nhật chiều rộng của mét.
    if (alive == true) {
      getStyleH.width = ctCurH * widther + "px";
      getStyleVM.width = ctCurVM * widther + "px";
      getStyleVR.width = ctCurVR * widther + "px";
    }
  }
  //hàm thưởng tiền
  function bonus(element) {
    let coinInt = parseInt(coins__price.innerHTML);
    coinInt += element;
    coins__price.innerHTML = coinInt;
  }

  function checkDangerVM() {
    if (ctCurVM < threshold) {
      dangerVM = true;
    } else {
      dangerVM = false;
    }
  }

  function checkDangerVR() {
    if (ctCurVR < threshold) {
      dangerVR = true;
    } else {
      dangerVR = false;
    }
  }

  function checkDangerH() {
    if ((ctCurVM < threshold || ctCurVR < threshold) && alive == true) {
      dangerH = true;
    } else {
      dangerH = false;
    }
  }

  function loseVM() {
    ctCurVM = ctCurVM - points;
  }

  function loseVR() {
    ctCurVR = ctCurVR - points;
  }

  function loseH() {
    ctCurH = ctCurH - 1;
  }

  // Sự kiện mua hàng trong shop
  // lấy sản phẩm trong shop đồ ăn
  const shop__food__1 = document.querySelector(".shop__food__1");
  const shop__food__2 = document.querySelector(".shop__food__2");
  const shop__food__3 = document.querySelector(".shop__food__3");
  const shop__food__4 = document.querySelector(".shop__food__4");
  // Lấy sản phẩm trong shop đồ chơi
  const shop__toys__1 = document.querySelector(".shop__toys__1");
  const shop__toys__2 = document.querySelector(".shop__toys__2");
  const shop__toys__3 = document.querySelector(".shop__toys__3");
  const shop__toys__4 = document.querySelector(".shop__toys__4");

  //Lấy value từ đồ ăn
  let value__food__1 = document.querySelector("#value__food__1").value;
  let value__food__2 = document.querySelector("#value__food__2").value;
  let value__food__3 = document.querySelector("#value__food__3").value;
  let value__food__4 = document.querySelector("#value__food__4").value;

  //Lấy value từ đồ chơi
  let value__toys__1 = document.querySelector("#value__toys__1").value;
  let value__toys__2 = document.querySelector("#value__toys__2").value;
  let value__toys__3 = document.querySelector("#value__toys__3").value;
  let value__toys__4 = document.querySelector("#value__toys__4").value;

  // lấy Xu trên thanh header
  const coin = document.querySelector("#coin").value;
  //lấy xu để hiển thị
  const coins__price = document.querySelector(".coins__price");

  //Hiển thị thông báo
  let success = document.querySelector(".success");
  let not__success = document.querySelector(".not__success");

  //Tao Object
  const shop__food = [
    shop__food__1,
    shop__food__2,
    shop__food__3,
    shop__food__4,
  ];
  const value__food = [
    value__food__1,
    value__food__2,
    value__food__3,
    value__food__4,
  ];

  const shop__toys = [
    shop__toys__1,
    shop__toys__2,
    shop__toys__3,
    shop__toys__4,
  ];
  const value__toys = [
    value__toys__1,
    value__toys__2,
    value__toys__3,
    value__toys__4,
  ];

  const printValueFood = [getFood_1, getFood_2, getFood_3, getFood_4];
  const printValueToys = [getToys_1, getToys_2, getToys_3, getToys_4];

  for (let i = 0; i < shop__food.length; i++) {
    shop__food[i].addEventListener("click", () => {
      const x = parseInt(value__food[i]);
      const y = parseInt(coins__price.innerHTML);

      if (x <= y) {
        coins__price.innerHTML = coins__price.innerHTML - value__food[i];
        printValueFood[i].innerHTML++;
        success.style.display = "block";
        not__success.style.display = "none";
        audio_shop_success();
      } else {
        success.style.display = "none";
        not__success.style.display = "block";
        audio_shop_error();
      }
    });
  }

  for (let i = 0; i < shop__toys.length; i++) {
    shop__toys[i].addEventListener("click", () => {
      const x = parseInt(value__toys[i]);
      const y = parseInt(coins__price.innerHTML);
      if (x <= y) {
        coins__price.innerHTML = coins__price.innerHTML - value__toys[i];
        printValueToys[i].innerHTML++;
        success.style.display = "block";
        not__success.style.display = "none";
        audio_shop_success();
      } else {
        success.style.display = "none";
        not__success.style.display = "block";
        audio_shop_error();
      }
    });
  }
};

const coins__price = document.querySelector(".coins__price");

function bonusTimer(element) {
  let coinInt = parseInt(coins__price.innerHTML);
  coinInt += element;
  coins__price.innerHTML = coinInt;
}

//Set thời gian hiển thị phần thưởng
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  let show__message = document.querySelector(".massage__gif").style;

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      show__message.display = "block";
      audio_bonus();
      bonusTimer(1000);
    } else {
      show__message.display = "none";
    }
  }, 1000);
}

const audio_shop_success = function () {
  feeding_sound.innerHTML = `<audio autoplay controls hidden> 
    <source src="./public/img/audio/cart-shop.mp3" type="audio/mpeg">
    </audio>`;
};

const audio_shop_error = function () {
  feeding_sound.innerHTML = `<audio autoplay controls hidden> 
    <source src="./public/img/audio/no-shop.mp3" type="audio/mpeg">
    </audio>`;
};

const audio_bonus = function () {
  feeding_sound.innerHTML = `<audio autoplay controls hidden> 
    <source src="./public/img/audio/bonus.mp3" type="audio/mpeg">
    </audio>`;
};

//Ham set thời gian tiền thưởng
const bonus_gif = function () {
  var fiveMinutes = 60 * 2, //60 giây * với số phút
    display = document.querySelector("#time"); //gọi đến id "time"
  startTimer(fiveMinutes, display);
};
// sự kiện kết thúc game
var toastTrigger = document.getElementById("liveToastBtn");
var toastLiveExample = document.getElementById("liveToast");
const play_again = document.querySelector("#play_again");
const closegame = document.querySelector("#close_gameover");
//sự kiện click để kết thúc game và quay về trang chủ
closegame.addEventListener("click", function () {
  toastLiveExample.style.display = "block";
  location.href = "../laucher.html";
});
//sự kiện người chơi được chơi lại
play_again.addEventListener("click", function () {
  toastLiveExample.style.display = "block";
  location.href = "./main-game.html";
});

function Sound_Main() {
  let setting = document.querySelector(".setting");
  let play__pause = document.querySelector(".play-pause");
  let temp = document.querySelector(".temp");

  play__pause.addEventListener("click", () => {
    if (temp.style.display == "none") {
      temp.style.display = "block";
      play__pause.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      Pause();
    } else {
      temp.style.display = "none";
      play__pause.innerHTML = `<i class="fas fa-volume-down"></i>`;
      Play();
    }
  });

  function Pause() {
    document.getElementsByClassName("main-sound")[0].pause();
  }

  function Play() {
    document.getElementsByClassName("main-sound")[0].play();
  }
}

function ChangeBG() {
  const change = document.querySelectorAll(".change");
  let body = document.querySelector("body");
  for (let i = 0; i < change.length; i++) {
    change[i].addEventListener("click", () => {
      body.style.background =
        `url('public/img/house-pet-` + (i + 1) + `.jpg') no-repeat`;
      body.style.backgroundPositionY = "-140px";
      body.style.backgroundSize = "cover";
    });
  }
}
