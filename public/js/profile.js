function ProfileViewModel() {
    self = this;

    self.user = ko.observable();

    console.log(parameter.id);

    $.get('/user/user/' + parameter.id, function(u){
        self.user(u);
    });

};

ko.applyBindings(new ProfileViewModel());