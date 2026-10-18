import { RouterOutlet } from "@angular/router";
import { AccessDenied } from "./components/access-denied/access-denied";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Layout } from "./components/layout/layout";
import { Login } from "./components/login/login";
import { Notfound } from "./components/notfound/notfound";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export class SharedConstants {
    public static readonly ANGULAR_COMPONENTS = [
        RouterOutlet,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]

    public static readonly COMPONENTS = [
        Header,
        Footer,
        Login,
        Layout,
        Notfound,
        AccessDenied
    ]
}
