var model = {
  currentCat: null,
  cats: [
    {
      name: "catClicker",
      score: "Choose a cat & click the pic!",
      url: ""
    },
    {
      name: "kittyCat",
      score: 0,
      url: "https://c1.staticflickr.com/6/5252/5563601612_d1e6d81c0c.jpg"
    },
    {
      name: "sleepyCat",
      score: 0,
      url: "http://hollywouldifshecould.net/wp-content/uploads/2014/04/cat.jpg"
    },
    {
      name: "angryCat",
      score: 0,
      url: "http://stuffpoint.com/cats/image/295310-cats-angry-cat.jpg"
    },
    {
      name: "fluffyCat",
      score: 0,
      url: "http://1.bp.blogspot.com/-6cpfL7n-FDU/VP1N47uj7nI/AAAAAAAAAgs/hWM2K0iKTR0/s1600/funny-cat-0113-Breeds%2Bof%2BCats%2BWith%2BBlue%2BEyes%C2%A0.png"
    },
    {
      name: "grumpyCat",
      score: 0,
      url: "https://yt3.ggpht.com/-V92UP8yaNyQ/AAAAAAAAAAI/AAAAAAAAAAA/zOYDMx8Qk3c/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
    }
  ]
};
var updateLevel = {
  level: ko.observable("Newbie")
};
ko.applyBindings(updateLevel);

var controller = {
  init: function() {
    model.currentCat = model.cats[0];
    catListView.init();
    catView.init();
  },
  setCurrentCat: function(obj) {
    model.currentCat = obj;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  updateScore: function() {
    model.currentCat.score++;
    if (model.currentCat.score < 10) {
      updateLevel.level("Newbie");
    }
    if (model.currentCat.score > 10) {
      updateLevel.level("Rookie");
    }
    if (model.currentCat.score > 20) {
      updateLevel.level("Pro");
    }
  },
  getCats: function() {
    return model.cats;
  }
};
var catView = {
  init: function() {
    this.catElem = document.getElementById("cat");
    this.catNameElem = document.getElementById("cat-name");
    this.catImageElem = document.getElementById("cat-img");
    this.countElem = document.getElementById("cat-count");
    this.catImageElem.addEventListener("click", function() {
      controller.updateScore();
      catView.render();
    });
    this.render();
  },
  render: function() {
    var obj = controller.getCurrentCat();
    this.countElem.textContent = obj.score;
    this.catNameElem.textContent = obj.name;
    this.catImageElem.src = obj.url;
  }
};

var catListView = {
  init: function() {
    this.catListElem = document.getElementById("cat-list");
    var cats = controller.getCats();

    var length = cats.length;
    for (var i = 1; i < length; i++) {
      // Create the list item:
      var cat = cats[i];
      var item = document.createElement("li");
      // Set its contents:
      item.textContent = cat.name;

      item.addEventListener(
        "click",
        (function(catCopy) {
          return function() {
            controller.setCurrentCat(catCopy);
            catView.render();
          };
        })(cat)
      );
      // Add it to the list:
      this.catListElem.appendChild(item);
    }
  }
};

var adminView = {
  init: function() {
    this.adminBtn = document.getElementById("admin-btn");
    this.adminBtn.addEventListener("click", function() {
      inputView.show();
    });
    this.cancelBtn = document.getElementById("cancel-btn");
    this.cancelBtn.addEventListener("click", function() {
      inputView.hide();
    });
    inputView.init();
  }
};

var inputView = {
  init: function() {
    this.inputField = document.getElementById("input-field");
    this.inputField.style.visibility = "hidden";
    this.save();
  },
  show: function() {
    this.inputField.style.visibility = "visible";
  },
  hide: function() {
    this.inputField.style.visibility = "hidden";
  },
  save: function() {
    this.saveBtn = document.getElementById("save-btn");

    this.saveBtn.addEventListener("click", function() {
      this.changeName = document.getElementById("change-name");
      this.changeScore = document.getElementById("change-score");
      this.changeUrl = document.getElementById("change-url");
      if (
        this.changeName.value &&
        this.changeScore.value &&
        this.changeUrl.value
      ) {
        model.currentCat.name = this.changeName.value;
        model.currentCat.score = this.changeScore.value;
        model.currentCat.url = this.changeUrl.value;
        catView.render();
      } else {
        alert("Fill in every field, pls!");
      }
    });
  }
};
controller.init();
adminView.init();
