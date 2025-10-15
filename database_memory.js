import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
    motoristas = new Map();

    list() {
        return Array.from(this.motoristas.values());
    }

    create(motorista) {
        const id = randomUUID();
        this.motoristas.set(id, motorista);
    }
    
    update(id, motorista) {
        this.motoristas.set(id, motorista );
    }

    delete(id) {
        this.motoristas.delete(id);
    }

    
}