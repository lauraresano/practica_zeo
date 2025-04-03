package com.practica.backend.controller;

import com.practica.backend.model.AltaUsuario;
import com.practica.backend.service.AltaUsuarioService;
import java.util.HashMap;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200") 
public class AltaUsuarioController {

    private final AltaUsuarioService usuarioService;

    
    public AltaUsuarioController(AltaUsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Registrar un usuario
    @PostMapping("/registrar")
    public Map<String, String> registrarUsuario(@RequestBody AltaUsuario usuario) {
        // Respuesta
        Map<String, String> response = new HashMap<>();
        response.put("response", usuarioService.registrarUsuario(usuario));

        return response;
    }

    // Autenticar usuario
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AltaUsuario usuario) {
        // Respuesta
        Map<String, String> response = new HashMap<>();
        response.put("response", usuarioService.autenticarUsuario(usuario));

        return response;
    }

    // Obtener la lista de usuarios
    @GetMapping("/lista")
    public List<AltaUsuario> obtenerUsuarios() {
        return usuarioService.obtenerUsuarios();
    }
}

