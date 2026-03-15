<?php
if (defined("CHARGE_BD")) {
    $db = "dbz_motus";
    $host = "localhost";
    $user = "root";
    $pwd = "";
    $dsn = "mysql:host=$host;dbname=$db";

    try {
        $cnx = new PDO($dsn, $user, $pwd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        $cnx->exec('SET NAMES "UTF8"');
    } catch (PDOException $e) {
        die('Erreur DB : ' . $e->getMessage());
    }
} else {
    die("Accès interdit");
}