const A = _ => class A extends _ {
    a() {
        if (super.a) super.a();
        console.log('a')
    }
}

const B = _ => class B extends _ {
    a() {
        console.log('b-a')
    }
    b() {
        console.log('b')
    }
}

// mixins.reverse() -> right overrids left
// first from left is super
function Mixins(...mixins) {
    return mixins.reverse().reduce((c, mixin) => mixin(c), class EmptySuperClass {});
}

class C extends Mixins(A, B) {
    c() {
        console.log('c')
    }
}
c = new C();