<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200919095210 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__box AS SELECT id, title FROM box');
        $this->addSql('DROP TABLE box');
        $this->addSql('CREATE TABLE box (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_8A9483AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO box (id, title) SELECT id, title FROM __temp__box');
        $this->addSql('DROP TABLE __temp__box');
        $this->addSql('CREATE INDEX IDX_8A9483AA76ED395 ON box (user_id)');
        $this->addSql('DROP INDEX IDX_161498D3D8177B3F');
        $this->addSql('CREATE TEMPORARY TABLE __temp__card AS SELECT id, box_id, recto, verso, face, compartment, next_at FROM card');
        $this->addSql('DROP TABLE card');
        $this->addSql('CREATE TABLE card (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, box_id INTEGER NOT NULL, recto VARCHAR(255) NOT NULL COLLATE BINARY, verso VARCHAR(255) NOT NULL COLLATE BINARY, face VARCHAR(5) NOT NULL COLLATE BINARY, compartment INTEGER NOT NULL, next_at DATETIME NOT NULL, CONSTRAINT FK_161498D3D8177B3F FOREIGN KEY (box_id) REFERENCES box (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO card (id, box_id, recto, verso, face, compartment, next_at) SELECT id, box_id, recto, verso, face, compartment, next_at FROM __temp__card');
        $this->addSql('DROP TABLE __temp__card');
        $this->addSql('CREATE INDEX IDX_161498D3D8177B3F ON card (box_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP INDEX IDX_8A9483AA76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__box AS SELECT id, title FROM box');
        $this->addSql('DROP TABLE box');
        $this->addSql('CREATE TABLE box (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO box (id, title) SELECT id, title FROM __temp__box');
        $this->addSql('DROP TABLE __temp__box');
        $this->addSql('DROP INDEX IDX_161498D3D8177B3F');
        $this->addSql('CREATE TEMPORARY TABLE __temp__card AS SELECT id, box_id, recto, verso, face, compartment, next_at FROM card');
        $this->addSql('DROP TABLE card');
        $this->addSql('CREATE TABLE card (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, box_id INTEGER NOT NULL, recto VARCHAR(255) NOT NULL, verso VARCHAR(255) NOT NULL, face VARCHAR(5) NOT NULL, compartment INTEGER NOT NULL, next_at DATETIME NOT NULL)');
        $this->addSql('INSERT INTO card (id, box_id, recto, verso, face, compartment, next_at) SELECT id, box_id, recto, verso, face, compartment, next_at FROM __temp__card');
        $this->addSql('DROP TABLE __temp__card');
        $this->addSql('CREATE INDEX IDX_161498D3D8177B3F ON card (box_id)');
    }
}
