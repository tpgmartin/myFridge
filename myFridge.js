Products = new Meteor.Collection('products');

if (Meteor.isClient) {

  Template.fridge.helpers({
    products: function(){
      return Products.find({place: 'fridge'});
    }
  });

  Template.productList.helpers({
    products: function(){
      return Products.find({place: 'supermarket'});
    }
  });

  Template.fridge.rendered = function () {
    $('#fridge').droppable({
      drop: function (evt, ui) {
        var query = {_id: $(ui.draggable).data('id')};
        var data = {$set: {place: 'fridge'}};
        Products.update(query, data);
      }
    });
  };

  Template.productList.rendered = function () {
    $('#supermarket').droppable({
      drop: function (evt, ui) {
        var query = {_id: $(ui.draggable).data('id')};
        var data = {$set: {place: 'supermarket'}};
        Products.update(query, data);
      }
    });
  };

  Template.productListItem.rendered = function () {
    $(this.find('.draggable')).draggable({
      cursor: 'move',
      helper: 'clone'
    });
  };

}

if (Meteor.isServer) {

  Meteor.startup(function () {

    Products.remove({});

    Products.insert({
        name: 'Milk',
        img: '/milk.png',
        place: 'fridge'
    });

    Products.insert({
        name: 'Bread',
        img: '/bread.png',
        place: 'supermarket'
    });

    Products.insert({
        name: 'Juice',
        img: '/juice.png',
        place: 'fridge'
    });

    Products.insert({
        name: 'Banana',
        img: '/banana.png',
        place: 'supermarket'
    });

  });

}