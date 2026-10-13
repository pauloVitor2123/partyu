import {
  BatteryFull,
  CalendarDays,
  ChevronDown,
  House,
  List,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Mountain,
  Music,
  Palette,
  Plus,
  Signal,
  User,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";

type Evento = {
  titulo: string;
  quando: string;
  onde: string;
  icone: LucideIcon;
  cor: string;
  social: string;
  avatares: string[];
};

const EVENTOS: Evento[] = [
  {
    titulo: "Feira gastronômica",
    quando: "Sáb · 16h",
    onde: "Centro",
    icone: UtensilsCrossed,
    cor: "linear-gradient(135deg, #ffb36b, #ff4d80)",
    social: "4 com alta afinidade",
    avatares: ["#7c5cff", "#2bb3a3", "#f5a524"],
  },
  {
    titulo: "Roda de samba",
    quando: "Sáb · 18h",
    onde: "Laranjeiras",
    icone: Music,
    cor: "linear-gradient(135deg, #7c5cff, #ff4d80)",
    social: "seu grupo topa",
    avatares: ["#ff4d80", "#2bb3a3"],
  },
  {
    titulo: "Exposição + happy hour",
    quando: "Dom · 19h",
    onde: "Botafogo",
    icone: Palette,
    cor: "linear-gradient(135deg, #2bb3a3, #3d7bff)",
    social: "comunidade aberta",
    avatares: ["#f5a524", "#7c5cff", "#ff4d80"],
  },
  {
    titulo: "Trilha + pôr do sol",
    quando: "Dom · 15h",
    onde: "Urca",
    icone: Mountain,
    cor: "linear-gradient(135deg, #f5a524, #2bb3a3)",
    social: "2 com alta afinidade",
    avatares: ["#3d7bff", "#ff4d80"],
  },
];

// Ilustração decorativa de uma tela do app (não interativa).
export function PhoneMockup() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-botao phone-botao-1" />
      <div className="phone-botao phone-botao-2" />
      <div className="phone-tela">
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-ilha" />
          <span className="phone-status-icones">
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <BatteryFull size={16} strokeWidth={2} />
          </span>
        </div>

        <div className="app-topo">
          <div className="app-local">
            <LogoMark size={26} />
            <span>
              <small>Perto de você</small>
              <strong>
                Rio de Janeiro <ChevronDown size={12} strokeWidth={3} />
              </strong>
            </span>
          </div>
          <div className="app-toggle">
            <span>
              <MapIcon size={13} />
            </span>
            <span className="ativo">
              <List size={13} />
            </span>
          </div>
        </div>

        <div className="app-chips">
          <span className="ativo">Este fim de semana</span>
          <span>Música</span>
          <span>Comida</span>
        </div>

        <p className="app-secao">Recomendados pra você</p>
        <div className="app-lista">
          {EVENTOS.map((e) => {
            const Icone = e.icone;
            return (
              <div key={e.titulo} className="app-card">
                <div className="app-card-capa" style={{ background: e.cor }}>
                  <Icone size={22} color="#fff" strokeWidth={2.2} />
                </div>
                <div className="app-card-info">
                  <strong>{e.titulo}</strong>
                  <span className="app-card-meta">
                    <CalendarDays size={11} /> {e.quando}
                    <MapPin size={11} /> {e.onde}
                  </span>
                  <span className="app-card-social">
                    <span className="app-avatares">
                      {e.avatares.map((cor) => (
                        <span key={cor} style={{ background: cor }} />
                      ))}
                    </span>
                    {e.social}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="app-abas">
          <span className="ativo">
            <House size={19} />
          </span>
          <span>
            <MessageCircle size={19} />
          </span>
          <span className="app-fab">
            <Plus size={20} strokeWidth={2.6} />
          </span>
          <span>
            <User size={19} />
          </span>
        </div>
      </div>
    </div>
  );
}
