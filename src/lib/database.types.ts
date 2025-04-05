export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          email: string;
          niveau_diplome: string;
          diplome_reconnu: boolean;
          experience_travail: string;
          connaissance_canada: boolean;
          deja_venu_canada: boolean;
          langue_parlee: string;
          id_paiement: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          niveau_diplome: string;
          diplome_reconnu: boolean;
          experience_travail: string;
          connaissance_canada: boolean;
          deja_venu_canada: boolean;
          langue_parlee: string;
          id_paiement: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          niveau_diplome?: string;
          diplome_reconnu?: boolean;
          experience_travail?: string;
          connaissance_canada?: boolean;
          deja_venu_canada?: boolean;
          langue_parlee?: string;
          id_paiement?: string;
          created_at?: string;
        };
      };
    };
  };
}